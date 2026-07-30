import sys
import os

# Import the centralized AI service
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..")))
try:
    from backend.services import ai_service
except ImportError:
    ai_service = None

def extract_information(text: str) -> dict:
    """
    Extract structured grant details from raw text.
    Integration point for calling the centralized ai_service.structured_generate().
    """
    # Integration Point: Skeletons for future extraction logic
    # schema = {"title": "str", "deadline": "str", "funding": "str"}
    # response = ai_service.structured_generate(text, response_schema=schema)
    
    # Return default empty structured dictionary
    return {
        "title": "Not Available",
        "funding_amount": "Not Available",
        "deadline": "Not Available",
        "eligibility": "Not Available",
        "research_areas": [],
        "required_documents": [],
        "country": "Not Available",
        "funding_agency": "Not Available"
    }