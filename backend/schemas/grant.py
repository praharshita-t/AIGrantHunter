"""
schemas/grant.py

Pydantic request/response schemas for grant endpoints.
"""

from pydantic import BaseModel, ConfigDict, Field
from typing import List, Optional


class GrantCreate(BaseModel):
    title: str = Field(..., json_schema_extra={"example": "AI for Healthcare"})
    agency: str = Field(..., json_schema_extra={"example": "NSF"})
    country: str = Field(..., json_schema_extra={"example": "USA"})
    funding: str = Field(..., json_schema_extra={"example": "$100,000"})
    deadline: str = Field(..., json_schema_extra={"example": "2026-09-30"})
    research_areas: List[str] = Field(default_factory=list)
    required_documents: List[str] = Field(default_factory=list)
    description: Optional[str] = None
    source_url: Optional[str] = None


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
    model_config = ConfigDict(from_attributes=True)

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
