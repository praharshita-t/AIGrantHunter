from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import sys
import os

# Ensure backend directory is in search path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))
from services import ai_service

router = APIRouter(prefix="/api/ai", tags=["AI Integration"])

class TestPromptRequest(BaseModel):
    prompt: str

@router.post("/test")
async def test_ai_endpoint(payload: TestPromptRequest):
    """
    Test endpoint to verify that Grok API integration is active and working.
    """
    response_text = ai_service.generate(prompt=payload.prompt)
    
    if not response_text:
        raise HTTPException(
            status_code=500,
            detail=(
                "Failed to generate response from Grok. Please verify that a valid GROK_API_KEY "
                "is set in your local .env file, and that your account has active credits."
            )
        )
        
    return {
        "status": "success",
        "response": response_text
    }
