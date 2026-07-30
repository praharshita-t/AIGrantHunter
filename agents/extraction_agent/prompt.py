# TODO: Implementation
"""
prompt.py

Prompt template for the Extraction Agent.
"""

EXTRACTION_PROMPT = """
Extract the following information from the grant webpage text.

Required fields:
- title
- deadline
- funding_amount
- eligibility
- research_areas
- required_documents
- country
- funding_agency

Return the extracted information as a JSON object.

If a field is missing, return "Not Available" for that field.
"""