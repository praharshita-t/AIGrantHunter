from datetime import datetime
import re
import sys
import os
import json

# Add parent directory to path to allow import of shared package
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..")))
try:
    from backend.services import ai_service
except ImportError:
    ai_service = None


def calculate_match_score(similarity: float) -> int:
    """
    Convert cosine similarity (0-1) into a score out of 100.
    """
    similarity = max(0.0, min(similarity, 1.0))
    return round(similarity * 100)


def calculate_priority_score(
    match_score: int,
    profile: dict,
    grant: dict
) -> tuple[int, int]:
    """
    Calculate an overall priority score.

    Factors:
    - Match Score (70%)
    - Deadline Urgency (10%)
    - Preferred Country (10%)
    - Funding Amount (10%)

    Returns:
        (priority_score, days_left)
    """

    # ---------- Deadline ----------
    try:
        deadline_date = datetime.strptime(grant.get("deadline") or "2026-10-15", "%Y-%m-%d")
        days_left = (deadline_date - datetime.today()).days
    except (ValueError, KeyError, TypeError):
        days_left = 30

    if days_left <= 7:
        deadline_score = 100
    elif days_left <= 15:
        deadline_score = 80
    elif days_left <= 30:
        deadline_score = 60
    elif days_left <= 60:
        deadline_score = 40
    else:
        deadline_score = 20

    # ---------- Preferred Country ----------
    country_score = (
        100
        if grant.get("country", "") in profile.get("preferred_countries", [])
        else 0
    )

    # ---------- Funding ----------
    try:
        amount = int(re.sub(r"[^\d]", "", grant.get("funding") or "0"))
    except (ValueError, KeyError, TypeError):
        amount = 0

    if amount >= 200000:
        funding_score = 100
    elif amount >= 100000:
        funding_score = 80
    elif amount >= 75000:
        funding_score = 60
    else:
        funding_score = 40

    # ---------- Final Weighted Score ----------
    priority = (
        0.70 * match_score +
        0.10 * deadline_score +
        0.10 * country_score +
        0.10 * funding_score
    )

    priority = max(match_score, round(priority))

    return priority, days_left


def explain_match(profile: dict, grant: dict, days_left: int) -> list[str]:
    """
    Generate human-readable explanations for why a grant matches.
    """

    # Static fallback logic
    def static_fallback():
        reasons = []
        profile_areas = set(profile.get("research_areas", []))
        grant_areas = set(grant.get("research_areas", []))
        common = profile_areas.intersection(grant_areas)
        if common:
            reasons.append(
                "Strong overlap in research areas: "
                + ", ".join(sorted(common))
            )
        else:
            reasons.append(
                "No direct research area overlap. Recommendation based on semantic similarity."
            )
        if grant.get("country", "") in profile.get("preferred_countries", []):
            reasons.append(
                f"Available in your preferred funding region ({grant.get('country', 'Not Available')})."
            )
        reasons.append(
            f"Grant offers funding of {grant.get('funding', 'Not Available')}."
        )
        if days_left <= 7:
            reasons.append("Deadline is within one week. Apply soon!")
        elif days_left <= 30:
            reasons.append(f"Application closes in {days_left} days.")
        else:
            reasons.append(f"Deadline is in {days_left} days.")
        return reasons

    fallback_reasons = static_fallback()

    if not ai_service:
        return fallback_reasons

    # Construct Grok prompt for personalized matching explanations
    messages = [
        {
            "role": "system",
            "content": (
                "You are an expert academic advisor. Your job is to explain why a specific research grant matches a researcher's profile. "
                "Provide exactly 3 to 4 clear, professional reasons, formatted as a bulleted list of separate sentences. "
                "Do NOT include markdown bullet points, symbols (like '-', '*', '•'), numbering, or bold headers. Just output the clean text lines. "
                "Make the reasons tailored to the researcher's background, skills, and the grant's specifics."
            )
        },
        {
            "role": "user",
            "content": (
                f"Researcher Profile:\n"
                f"- Research Areas: {', '.join(profile.get('research_areas', []))}\n"
                f"- Skills: {', '.join(profile.get('skills', []))}\n"
                f"- Publications: {', '.join(profile.get('publications', []))}\n"
                f"- Career Stage: {profile.get('career_stage', 'Unknown')}\n\n"
                f"Grant Details:\n"
                f"- Title: {grant.get('title', 'Not Available')}\n"
                f"- Agency: {grant.get('agency', 'Not Available')}\n"
                f"- Country: {grant.get('country', 'Not Available')}\n"
                f"- Funding: {grant.get('funding', 'Not Available')}\n"
                f"- Deadline: {grant.get('deadline', 'Not Available')} ({days_left} days remaining)\n"
                f"- Research Areas: {', '.join(grant.get('research_areas') or [])}"
            )
        }
    ]

    response_text = ai_service.chat(
        messages=messages
    )

    if not response_text:
        return fallback_reasons

    # Parse and clean output lines
    lines = []
    for line in response_text.splitlines():
        line = line.strip().lstrip("-").lstrip("*").lstrip("•").lstrip("1234567890.").strip()
        if line:
            lines.append(line)

    return lines if len(lines) >= 2 else fallback_reasons


def recommend_action(priority_score: int, days_left: int) -> str:
    """
    Recommend the next action based on urgency and overall priority.
    """

    if days_left <= 7:
        return "Apply immediately"

    if priority_score >= 80:
        return "High priority – prepare application"

    if priority_score >= 60:
        return "Prepare application"

    return "Consider applying if aligned with your goals"


def score_grant(
    profile: dict,
    grant: dict,
    similarity: float
) -> dict:
    """
    Generate the final recommendation for a grant.
    """

    match_score = calculate_match_score(similarity)

    priority_score, days_left = calculate_priority_score(
        match_score,
        profile,
        grant
    )

    return {
        "title": grant.get("title", "Not Available"),
        "agency": grant.get("agency", "Not Available"),
        "country": grant.get("country", "Not Available"),
        "funding": grant.get("funding", "Not Available"),
        "deadline": grant.get("deadline", "Not Available"),

        "match_score": match_score,
        "priority_score": priority_score,

        "why_this_grant": explain_match(
            profile,
            grant,
            days_left
        ),

        "recommended_action": recommend_action(
            priority_score,
            days_left
        )
    }