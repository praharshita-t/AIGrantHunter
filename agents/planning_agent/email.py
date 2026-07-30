"""
email.py

Generates an email notification for a grant recommendation.
"""

from typing import Dict, List


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

    return {
        "subject": subject,
        "body": body.strip(),
    }