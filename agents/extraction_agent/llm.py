"""
llm.py

Extracts structured grant information from cleaned webpage text.
"""

import re


def extract_information(text):
    """
    Extract grant details from cleaned webpage text.

    Args:
        text (str): Cleaned webpage text.

    Returns:
        dict: Structured grant information.
    """

    fields = {
        "title": "Grant Title:",
        "funding_amount": "Funding Amount:",
        "deadline": "Deadline:",
        "eligibility": "Eligibility:",
        "research_areas": "Research Areas:",
        "required_documents": "Required Documents:",
        "country": "Country:",
        "funding_agency": "Funding Agency:"
    }

    result = {}

    for key, label in fields.items():

        pattern = rf"{re.escape(label)}\s*(.*?)(?=\n[A-Za-z ]+:|\Z)"
        match = re.search(pattern, text, re.DOTALL)

        if match:
            value = match.group(1).strip()

            # Convert multiline sections into lists
            if key in ["research_areas", "required_documents"]:
                items = []

                for line in value.splitlines():
                    line = line.strip().lstrip("-").strip()

                    if line:
                        items.append(line)

                result[key] = items

            else:
                result[key] = value

        else:
            result[key] = "Not Available"

    return result