"""
email_generator.py

Generates an email notification for a grant recommendation.
"""

from typing import Dict, List
import sys
import os

# Add parent directory to path to allow import of shared package
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..")))
try:
    from backend.services import ai_service
except ImportError:
    ai_service = None


def generate_email(grant: Dict, plan: Dict, checklist: List[str]) -> Dict:
    """
    Generate an email subject and body.

    Parameters
    ----------
    grant : dict
        Grant details.
    plan : dict
        Planning information.
    checklist : list
        Personalised application checklist.

    Returns
    -------
    dict
        Email subject and body.
    """

    subject = f"Grant Recommendation: {grant.get('title')}"

    # Fallback body text template
    def static_fallback():
        body = f"""
Hello Researcher,

A new grant opportunity has been identified that matches your research profile.

Grant Title: {grant.get('title')}
Agency: {grant.get('agency')}
Match Score: {grant.get('match_score')}%
Priority Score: {grant.get('priority_score')}%

Deadline:
{plan.get('days_left')} days remaining

Estimated Preparation Time:
{plan.get('estimated_days')} days

Urgency:
{plan.get('urgency')}

Recommended Action:
{plan.get('recommended_action')}

Application Checklist:
"""
        for index, item in enumerate(checklist, start=1):
            body += f"\n{index}. {item}"
        body += """

Good luck with your application!

Regards,
AI Grant Opportunity Hunter
"""
        return body.strip()

    fallback_body = static_fallback()

    if not ai_service:
        return {
            "subject": subject,
            "body": fallback_body,
        }

    # Construct Grok prompt for custom professional email body
    checklist_str = "\n".join(f"- {item}" for item in checklist)
    messages = [
        {
            "role": "system",
            "content": (
                "You are an expert grant acquisition strategist. Write a professional, encouraging email advising a researcher about a matched grant opportunity. "
                "The email must have a formal and supportive tone. Detail the match scores, the urgent timeline/deadlines, the recommended initial action, "
                "and list the prep checklist in a structured way. Keep the structure clear and readable, and sign off as 'AI Grant Opportunity Hunter'. "
                "Do NOT write any subject lines or greeting/headers outside the body content. Only output the email body text."
            )
        },
        {
            "role": "user",
            "content": (
                f"Grant Details:\n"
                f"- Title: {grant.get('title')}\n"
                f"- Agency: {grant.get('agency')}\n"
                f"- Match Score: {grant.get('match_score')}%\n"
                f"- Priority Score: {grant.get('priority_score')}%\n\n"
                f"Planning details:\n"
                f"- Days Left: {plan.get('days_left')} days\n"
                f"- Estimated Prep Time: {plan.get('estimated_days')} days\n"
                f"- Urgency: {plan.get('urgency')}\n"
                f"- Recommended Action: {plan.get('recommended_action')}\n\n"
                f"Checklist:\n{checklist_str}"
            )
        }
    ]

    response_text = ai_service.chat(
        messages=messages
    )

    return {
        "subject": subject,
        "body": response_text.strip() if response_text else fallback_body,
    }
