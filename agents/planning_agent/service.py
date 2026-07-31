"""
service.py

Main entry point for the Planning Agent.
"""

from .checklist import generate_checklist
from .planner import generate_plan
from .notifier import create_notification
from .email_generator import generate_email


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