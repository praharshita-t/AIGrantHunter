import sys
import os
import json
import re

# Import the centralized AI service
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..")))
try:
    from backend.services import ai_service
except ImportError:
    ai_service = None

def extract_information(text: str) -> dict:
    """
    Extract structured grant details from raw text using the centralized AI service.
    """
    if not ai_service:
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
        
    prompt = (
        f"Extract the following grant details from this text:\n"
        f"- Title of the grant\n"
        f"- Funding Amount (e.g. $100,000 or ₹25,00,000)\n"
        f"- Deadline (use YYYY-MM-DD format if date is mentioned, or specify 'Unknown')\n"
        f"- Eligibility requirements summary\n"
        f"- Research areas / fields (as a list of strings)\n"
        f"- Required documents (as a list of strings)\n"
        f"- Country (e.g. USA, India, UK, or 'Global')\n"
        f"- Funding agency name (e.g. NSF, ANRF, UKRI)\n\n"
        f"Text:\n{text}"
    )
    
    schema = {
        "title": "str",
        "funding_amount": "str",
        "deadline": "str",
        "eligibility": "str",
        "research_areas": ["str"],
        "required_documents": ["str"],
        "country": "str",
        "funding_agency": "str"
    }
    
    try:
        extracted = ai_service.structured_generate(prompt, response_schema=schema)
        if not extracted:
            raise ValueError("Structured generation returned empty")
            
        return {
            "title": extracted.get("title", "Not Available"),
            "funding_amount": extracted.get("funding_amount", "Not Available"),
            "deadline": extracted.get("deadline", "Not Available"),
            "eligibility": extracted.get("eligibility", "Not Available"),
            "research_areas": extracted.get("research_areas") or [],
            "required_documents": extracted.get("required_documents") or [],
            "country": extracted.get("country", "Not Available"),
            "funding_agency": extracted.get("funding_agency", "Not Available")
        }
    except Exception as e:
        print(f"Extraction failed, returning default: {e}")
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