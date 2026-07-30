"""
checklist.py

Generates a personalised application checklist for a researcher.
"""

from typing import Dict, List


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

    checklist = list(BASE_CHECKLIST)

    # Required documents
    for doc in grant.get("required_documents", []):
        doc = doc.strip()

        if doc.lower() == "cv":
            checklist.append("Update CV")
        else:
            checklist.append(f"Prepare {doc}")

    # Research area suggestions
    for area in grant.get("areas", []):
        tasks = AREA_TASKS.get(area, [])
        checklist.extend(tasks)

    # Closing tasks
    checklist.extend([
        "Review submission portal",
        "Submit application before deadline",
    ])

    # Remove duplicates while preserving order
    unique = []
    seen = set()

    for item in checklist:
        if item not in seen:
            seen.add(item)
            unique.append(item)

    return unique