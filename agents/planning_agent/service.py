"""
service.py

Main entry point for the Planning Agent.
"""

import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..")))
try:
    from backend.services import ai_service
except ImportError:
    ai_service = None

from .checklist import generate_checklist
from .planner import generate_plan
from .notifier import create_notification
from .email_generator import generate_email


def generate_ai_advisor_report(researcher: dict, grant: dict) -> dict:
    """
    Call Featherless AI to generate a comprehensive AI Advisor report for a single grant,
    tailored to the researcher's profile.
    """
    if not ai_service:
        return {
            "category": "Good Fit",
            "urgency": "Medium",
            "summary": f"This program supports research in {', '.join(grant.get('research_areas', []))}.",
            "why_fits": f"Your research interests align with this opportunity.",
            "eligibility_concerns": "Verify specific institutional constraints.",
            "strategy": "Prepare a strong proposal highlighting preliminary findings.",
            "strengths": "Strong alignment on core methodology.",
            "weaknesses": "Competition is highly selective.",
            "recommended_action": "Begin drafting proposal specific aims.",
            "checklist": ["Review submission guidelines", "Draft proposal narrative"],
            "required_documents": grant.get("required_documents") or ["Proposal", "CV"],
            "timeline": ["Week 1: Draft outline", "Week 2: Refine draft", "Week 3: Submit application"]
        }

    prompt = (
        "You are an expert AI academic advisor and grant strategist.\n"
        "Your task is to analyze the matching of a research grant to a researcher's profile and generate a comprehensive application report.\n\n"
        "Researcher Profile:\n"
        f"- Name: {researcher.get('name', 'Researcher')}\n"
        f"- Institution: {researcher.get('institution', 'Not Available')} (Type: {researcher.get('institution_type', 'University')})\n"
        f"- Career Stage: {researcher.get('career_stage', 'Unknown')} (Experience: {researcher.get('research_experience', 'Unknown')})\n"
        f"- Highest Degree: {researcher.get('highest_degree', 'Unknown')}\n"
        f"- Research Areas: {', '.join(researcher.get('research_areas', []))}\n"
        f"- Skills: {', '.join(researcher.get('skills', []))}\n"
        f"- Publications: {', '.join(researcher.get('publications', []))}\n"
        f"- Preferred Countries: {', '.join(researcher.get('preferred_countries', []))}\n"
        f"- Funding History: {researcher.get('funding_history', [])}\n\n"
        "Grant Details:\n"
        f"- Title: {grant.get('title')}\n"
        f"- Agency: {grant.get('agency')}\n"
        f"- Country: {grant.get('country')}\n"
        f"- Funding: {grant.get('funding')}\n"
        f"- Deadline: {grant.get('deadline')}\n"
        f"- Research Areas: {', '.join(grant.get('research_areas', []))}\n"
        f"- Description/Eligibility: {grant.get('description', '')}\n\n"
        "Based on this, generate a JSON response with these exact fields:\n"
        "1. 'category': One of 'Top Recommended', 'Good Fit', 'Stretch Opportunity', 'Low Priority'.\n"
        "2. 'urgency': One of 'Critical', 'High', 'Medium', 'Low'.\n"
        "3. 'summary': Executive AI summary of the grant opportunity.\n"
        "4. 'why_fits': Explain why this grant matches the researcher's profile. Do NOT use template strings or generic statements.\n"
        "5. 'eligibility_concerns': Detail any eligibility requirements, constraints, or concerns.\n"
        "6. 'strategy': A custom application and outreach strategy for this grant.\n"
        "7. 'strengths': The specific strengths of the researcher's profile for this grant.\n"
        "8. 'weaknesses': Risks, gaps, or weaknesses in the researcher's profile for this grant.\n"
        "9. 'recommended_action': Specific immediate next steps (1-2 sentences).\n"
        "10. 'checklist': A list of concrete preparation checklist tasks (list of strings).\n"
        "11. 'required_documents': A list of required application documents (list of strings).\n"
        "12. 'timeline': A list of suggested weekly timeline check-points (list of strings).\n\n"
        "Your response must be a valid JSON object. Do not wrap in markdown block backticks. Output ONLY the JSON string."
    )

    schema = {
        "category": "str",
        "urgency": "str",
        "summary": "str",
        "why_fits": "str",
        "eligibility_concerns": "str",
        "strategy": "str",
        "strengths": "str",
        "weaknesses": "str",
        "recommended_action": "str",
        "checklist": ["str"],
        "required_documents": ["str"],
        "timeline": ["str"]
    }

    try:
        report = ai_service.structured_generate(prompt, response_schema=schema)
        if report:
            return report
    except Exception as e:
        print(f"Error generating AI advisor report: {e}")

    return {
        "category": "Good Fit" if grant.get("match_score", 50) >= 80 else "Low Priority",
        "urgency": "Medium",
        "summary": f"This program supports research in {', '.join(grant.get('research_areas', []))}.",
        "why_fits": f"Your research interests align with this opportunity.",
        "eligibility_concerns": "Verify specific institutional constraints.",
        "strategy": "Prepare a strong proposal highlighting preliminary findings.",
        "strengths": "Strong alignment on core methodology.",
        "weaknesses": "Competition is highly selective.",
        "recommended_action": "Begin drafting proposal specific aims.",
        "checklist": ["Review submission guidelines", "Draft proposal narrative"],
        "required_documents": grant.get("required_documents") or ["Proposal", "CV"],
        "timeline": ["Week 1: Draft outline", "Week 2: Refine draft", "Week 3: Submit application"]
    }


def run_planning_agent(grant: dict) -> dict:
    """
    Execute the complete planning workflow.
    """

    checklist = generate_checklist(grant)

    plan = generate_plan(grant)

    notification = create_notification(
        grant,
        plan,
    )

    email = generate_email(
        grant,
        plan,
        checklist,
    )

    return {
        "checklist": checklist,
        "plan": plan,
        "notification": notification,
        "email": email,
    }