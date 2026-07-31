"""
schemas/researcher.py

Pydantic request/response schemas for researcher endpoints.
"""

from pydantic import BaseModel, ConfigDict, Field
from typing import List, Optional


class ResearcherCreate(BaseModel):
    name: str = Field(..., json_schema_extra={"example": "Dr. Priya Sharma"})
    institution: str = Field(..., json_schema_extra={"example": "IIT Madras"})
    career_stage: str = Field(..., json_schema_extra={"example": "Postdoctoral Researcher"})
    research_areas: List[str] = Field(default_factory=list)
    skills: List[str] = Field(default_factory=list)
    publications: List[str] = Field(default_factory=list)
    preferred_countries: List[str] = Field(default_factory=list)
    email: Optional[str] = None


class ResearcherUpdate(BaseModel):
    name: Optional[str] = None
    institution: Optional[str] = None
    career_stage: Optional[str] = None
    research_areas: Optional[List[str]] = None
    skills: Optional[List[str]] = None
    publications: Optional[List[str]] = None
    preferred_countries: Optional[List[str]] = None
    email: Optional[str] = None


class ResearcherResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    institution: str
    career_stage: str
    research_areas: List[str]
    skills: List[str]
    publications: List[str]
    preferred_countries: List[str]
    email: Optional[str] = None
