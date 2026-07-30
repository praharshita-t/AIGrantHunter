"""
checklist.py

Generates a personalised application checklist for a researcher.
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


# Tasks that every applicant should complete
BASE_CHECKLIST = [
    "Read grant guidelines",
    "Verify eligibility",
    "Create application timeline",
]


# Research-area-specific suggestions
AREA_TASKS = {
    "Artificial Intelligence": [
        "Review recent AI literature",
        "Prepare methodology",
    ],
    "Healthcare": [
        "Gather Healthcare AI references",
    ],
    "Cybersecurity": [
        "Collect cybersecurity datasets",
        "Review recent security research",
    ],
    "Machine Learning": [
        "Validate ML methodology",
    ],
}


def generate_checklist(grant: Dict) -> List[str]:
    """
    Generate a personalised checklist for a grant.

    Parameters
    ----------
    grant : dict
        Structured grant information from the Extraction Agent.

    Returns
    -------
    List[str]
        Ordered checklist.
    """

    # Static fallback logic
    def static_fallback():
        checklist = list(BASE_CHECKLIST)
        for doc in grant.get("required_documents", []):
            doc = doc.strip()
            if doc.lower() == "cv":
                checklist.append("Update CV")
            else:
                checklist.append(f"Prepare {doc}")
        for area in grant.get("areas", []):
            tasks = AREA_TASKS.get(area, [])
            checklist.extend(tasks)
        checklist.extend([
            "Review submission portal",
            "Submit application before deadline",
        ])
        unique = []
        seen = set()
        for item in checklist:
            if item not in seen:
                seen.add(item)
                unique.append(item)
        return unique

    fallback_checklist = static_fallback()

    if not ai_service:
        return fallback_checklist

    messages = [
        {
            "role": "system",
            "content": (
                "You are an expert grant consultant. Generate a step-by-step checklist of preparation tasks and document requirements for a research grant application. "
                "Output exactly one checklist task per line. "
                "Do NOT include bullet points, numbering, or markdown prefixes (such as '-', '*', or '•'). Just output the raw task text on each line."
            )
        },
        {
            "role": "user",
            "content": (
                f"Grant Details:\n"
                f"- Title: {grant.get('title')}\n"
                f"- Agency: {grant.get('agency')}\n"
                f"- Deadline: {grant.get('deadline')}\n"
                f"- Required Documents: {', '.join(grant.get('required_documents', []))}\n"
                f"- Research Areas: {', '.join(grant.get('areas', [])) if grant.get('areas') else ', '.join(grant.get('research_areas', []))}"
            )
        }
    ]

    response_text = ai_service.chat(
        messages=messages
    )

    if not response_text:
        return fallback_checklist

    tasks = []
    for line in response_text.splitlines():
        line = line.strip().lstrip("-").lstrip("*").lstrip("•").lstrip("1234567890.").strip()
        if line:
            tasks.append(line)

    return tasks if len(tasks) >= 3 else fallback_checklist