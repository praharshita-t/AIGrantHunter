"""
extractor.py

Coordinates the extraction pipeline.
"""

from .parser import parse_text
from .llm import extract_information


def run_extraction(raw_text):
    """
    Run the extraction pipeline.

    Args:
        raw_text (str): Raw grant webpage text.

    Returns:
        dict: Structured grant information.
    """

    # Step 1: Clean the text
    cleaned_text = parse_text(raw_text)

    # Step 2: Extract structured information
    extracted_data = extract_information(cleaned_text)

    return extracted_data