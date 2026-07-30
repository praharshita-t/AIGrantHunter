"""
service.py

Public entry point for the Extraction Agent.
"""

from extractor import run_extraction


def run_extraction_agent(raw_text):
    """
    Execute the Extraction Agent.

    Args:
        raw_text (str): Raw grant webpage text.

    Returns:
        dict: Extracted grant information.
    """

    return run_extraction(raw_text)