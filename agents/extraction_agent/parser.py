"""
parser.py

Cleans raw grant webpage text before extraction.
"""

def parse_text(raw_text):
    """
    Clean the raw webpage text.

    Args:
        raw_text (str): Raw text from a grant webpage.

    Returns:
        str: Cleaned text.
    """

    if not raw_text:
        return ""

    # Remove leading/trailing whitespace
    cleaned_text = raw_text.strip()

    # Remove empty lines
    lines = [line.strip() for line in cleaned_text.splitlines() if line.strip()]

    # Join lines back together
    return "\n".join(lines)