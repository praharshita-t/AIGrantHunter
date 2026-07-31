"""
schemas/grant.py

Pydantic request/response schemas for grant endpoints.
"""

from pydantic import BaseModel, Field
from typing import List, Optional


class GrantCreate(BaseModel):
    title: str = Field(..., example="AI for Healthcare")
    agency: str = Field(..., example="NSF")
    country: str = Field(..., example="USA")
    funding: str = Field(..., example="$100,000")
    deadline: str = Field(..., example="2026-09-30")
    research_areas: List[str] = Field(default_factory=list, example=["AI", "Healthcare"])
    required_documents: List[str] = Field(default_factory=list, example=["Proposal", "Budget", "CV"])
    description: Optional[str] = Field(None, example="Grant supporting AI research in healthcare")
    source_url: Optional[str] = Field(None, example="https://nsf.gov/grants/ai-healthcare")


class GrantUpdate(BaseModel):
    title: Optional[str] = None
    agency: Optional[str] = None
    country: Optional[str] = None
    funding: Optional[str] = None
    deadline: Optional[str] = None
    research_areas: Optional[List[str]] = None
    required_documents: Optional[List[str]] = None
    description: Optional[str] = None
    source_url: Optional[str] = None


class GrantResponse(BaseModel):
    id: int
    title: str
    agency: str
    country: str
    funding: str
    deadline: str
    research_areas: List[str]
    required_documents: List[str]
    description: Optional[str] = None
    source_url: Optional[str] = None

    class Config:
        from_attributes = True
