"""
schemas/match.py

Pydantic request/response schemas for match endpoints.
"""

from pydantic import BaseModel, Field
from typing import List, Optional


class MatchCreate(BaseModel):
    researcher_id: int = Field(..., example=1)
    grant_id: int = Field(..., example=101)
    grant_title: str = Field(..., example="AI for Healthcare")
    agency: str = Field(..., example="NSF")
    country: str = Field(..., example="USA")
    funding: str = Field(..., example="$100,000")
    deadline: str = Field(..., example="2026-09-30")
    match_score: int = Field(..., ge=0, le=100, example=92)
    priority_score: int = Field(..., ge=0, le=100, example=88)
    why_this_grant: List[str] = Field(default_factory=list, example=["Strong overlap in AI research"])
    recommended_action: str = Field("", example="High priority – prepare application")


class MatchResponse(BaseModel):
    id: int
    researcher_id: int
    grant_id: int
    grant_title: str
    agency: str
    country: str
    funding: str
    deadline: str
    match_score: int
    priority_score: int
    why_this_grant: List[str]
    recommended_action: str

    class Config:
        from_attributes = True
