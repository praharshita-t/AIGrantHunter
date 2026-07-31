"""
schemas/match.py

Pydantic request/response schemas for match endpoints.
"""

from pydantic import BaseModel, ConfigDict, Field
from typing import List


class MatchCreate(BaseModel):
    researcher_id: int
    grant_id: int
    grant_title: str
    agency: str
    country: str
    funding: str
    deadline: str
    match_score: int = Field(..., ge=0, le=100)
    priority_score: int = Field(..., ge=0, le=100)
    why_this_grant: List[str] = Field(default_factory=list)
    recommended_action: str = ""


class MatchResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

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
