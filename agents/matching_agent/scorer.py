from datetime import datetime
import re


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
    deadline_date = datetime.strptime(grant["deadline"], "%Y-%m-%d")
    days_left = (deadline_date - datetime.today()).days

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
        if grant["country"] in profile.get("preferred_countries", [])
        else 0
    )

    # ---------- Funding ----------
    amount = int(re.sub(r"[^\d]", "", grant["funding"]))

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

    if grant["country"] in profile.get("preferred_countries", []):
        reasons.append(
            f"Available in your preferred funding region ({grant['country']})."
        )

    reasons.append(
        f"Grant offers funding of {grant['funding']}."
    )

    if days_left <= 7:
        reasons.append("Deadline is within one week. Apply soon!")
    elif days_left <= 30:
        reasons.append(f"Application closes in {days_left} days.")
    else:
        reasons.append(f"Deadline is in {days_left} days.")

    return reasons


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
        "title": grant["title"],
        "agency": grant["agency"],
        "country": grant["country"],
        "funding": grant["funding"],
        "deadline": grant["deadline"],

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