"""
notifier.py

Generates notification messages for researchers.
"""

from typing import Dict


def create_notification(grant: Dict, plan: Dict) -> Dict:
    """
    Create a notification payload from grant and planning information.

    Parameters
    ----------
    grant : dict
        Grant details from the Matching Agent.
    plan : dict
        Planning details from planner.py

    Returns
    -------
    dict
        Notification payload.
    """

    if plan["urgency"] in ("Critical", "High"):
        title = "🚨 High Priority Grant Found"
    else:
        title = "📢 New Grant Recommendation"

    return {
        "title": title,
        "agency": grant.get("agency", "Unknown"),
        "grant_title": grant.get("title", "Unknown Grant"),
        "match_score": grant.get("match_score"),
        "priority_score": grant.get("priority_score"),
        "days_left": plan.get("days_left"),
        "estimated_preparation_days": plan.get("estimated_days"),
        "urgency": plan.get("urgency"),
        "recommended_action": plan.get("recommended_action"),
        "message": (
    f"{grant.get('title')} is a {plan.get('urgency').lower()} priority "
    f"grant with {plan.get('days_left')} days remaining. "
    f"{plan.get('recommended_action')}"
),
    }