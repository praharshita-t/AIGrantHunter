"""
planner.py

Generates a research preparation plan based on the matched grant.
"""

from datetime import datetime
from typing import Dict, Tuple
import sys
import os

# Add parent directory to path to allow import of shared package
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..")))
try:
    from backend.services import ai_service
except ImportError:
    ai_service = None

def estimate_preparation_time(grant: Dict) -> int:
    """
    Estimate the number of days required to prepare the application.
    """

    days = 3  # Base preparation time

    for doc in grant.get("required_documents", []):
        doc = doc.lower()

        if "proposal" in doc:
            days += 2
        elif "budget" in doc:
            days += 1
        elif "cv" in doc:
            days += 1
        elif "letter" in doc:
            days += 1
        else:
            days += 1

    return days




def calculate_urgency(deadline: str) -> Tuple[str, int]:
    """
    Determine urgency based on the application deadline.

    Parameters
    ----------
    deadline : str
        Deadline in YYYY-MM-DD format.

    Returns
    -------
    Tuple[str, int]
        (urgency, days_left)
    """

    try:
        deadline_date = datetime.strptime(deadline, "%Y-%m-%d").date()
        today = datetime.today().date()
        days_left = (deadline_date - today).days
    except (ValueError, KeyError, TypeError):
        return "Medium", 30

    if days_left < 0:
        return "Expired", days_left
    elif days_left <= 7:
        return "Critical", days_left
    elif days_left <= 14:
        return "High", days_left
    elif days_left <= 30:
        return "Medium", days_left

    return "Low", days_left


def recommend_action(priority_score: int,
                     urgency: str,
                     estimated_days: int,
                     days_left: int) -> str:

    if days_left < estimated_days:
        return "Begin immediately. Preparation time exceeds the remaining time before the deadline."

    if urgency == "Critical":
        return "Submit application immediately."

    if urgency == "High":
        if priority_score >= 80:
            return "Start proposal drafting this week."
        return "Complete required documents as soon as possible."

    if urgency == "Medium":
        return "Prepare required documents and begin writing."

    return "Begin literature review and prepare early."


def generate_plan(grant: Dict) -> Dict:

    estimated_days = estimate_preparation_time(grant)

    urgency, days_left = calculate_urgency(grant["deadline"])

    # Default action using rule-based recommendation
    default_action = recommend_action(
        grant.get("priority_score", 50),
        urgency,
        estimated_days,
        days_left,
    )

    if not ai_service:
        action = default_action
    else:
        messages = [
            {
                "role": "system",
                "content": (
                    "You are an expert grant timeline strategist. Recommend the single best immediate action a researcher should take. "
                    "Keep the recommendation concise (1-2 sentences maximum), direct, and highly actionable. "
                    "Make it fit the urgency, number of days left, and priority."
                )
            },
            {
                "role": "user",
                "content": (
                    f"Grant Title: {grant.get('title')}\n"
                    f"Priority Score: {grant.get('priority_score', 50)}/100\n"
                    f"Urgency Level: {urgency}\n"
                    f"Days Remaining: {days_left}\n"
                    f"Estimated Days Required for Preparation: {estimated_days}\n"
                    f"Required Documents: {', '.join(grant.get('required_documents', []))}"
                )
            }
        ]
        response_text = ai_service.chat(
            messages=messages
        )
        action = response_text.strip() if response_text else default_action

    return {
        "estimated_days": estimated_days,
        "days_left": days_left,
        "urgency": urgency,
        "recommended_action": action,
    }