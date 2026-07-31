"""
schemas/researcher.py

Pydantic request/response schemas for researcher endpoints.
"""

from pydantic import BaseModel, EmailStr, Field
from typing import List, Optional


class ResearcherCreate(BaseModel):
    name: str = Field(..., example="Dr. Priya Sharma")
    institution: str = Field(..., example="IIT Madras")
    career_stage: str = Field(..., example="Postdoctoral Researcher")
    research_areas: List[str] = Field(default_factory=list, example=["AI", "Healthcare"])
    skills: List[str] = Field(default_factory=list, example=["Python", "Deep Learning"])
    publications: List[str] = Field(default_factory=list, example=["AI-based Disease Prediction"])
    preferred_countries: List[str] = Field(default_factory=list, example=["India", "European Union"])
    email: Optional[str] = Field(None, example="priya@iitm.ac.in")


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
    id: int
    name: str
    institution: str
    career_stage: str
    research_areas: List[str]
    skills: List[str]
    publications: List[str]
    preferred_countries: List[str]
    email: Optional[str] = None

    class Config:
        from_attributes = True
