"""
models.py

Core domain model classes for AI Grant Hunter.
These are plain Python dataclasses — not tied to any ORM.
"""

from dataclasses import dataclass, field
from typing import List, Optional


@dataclass
class Researcher:
    id: int
    name: str
    institution: str
    career_stage: str
    research_areas: List[str] = field(default_factory=list)
    skills: List[str] = field(default_factory=list)
    publications: List[str] = field(default_factory=list)
    preferred_countries: List[str] = field(default_factory=list)
    email: Optional[str] = None

    def to_dict(self) -> dict:
        return {
            "id": self.id,
            "name": self.name,
            "institution": self.institution,
            "career_stage": self.career_stage,
            "research_areas": self.research_areas,
            "skills": self.skills,
            "publications": self.publications,
            "preferred_countries": self.preferred_countries,
            "email": self.email,
        }


@dataclass
class Grant:
    id: int
    title: str
    agency: str
    country: str
    funding: str
    deadline: str
    research_areas: List[str] = field(default_factory=list)
    required_documents: List[str] = field(default_factory=list)
    description: Optional[str] = None
    source_url: Optional[str] = None

    def to_dict(self) -> dict:
        return {
            "id": self.id,
            "title": self.title,
            "agency": self.agency,
            "country": self.country,
            "funding": self.funding,
            "deadline": self.deadline,
            "research_areas": self.research_areas,
            "required_documents": self.required_documents,
            "description": self.description,
            "source_url": self.source_url,
        }


@dataclass
class Match:
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
    why_this_grant: List[str] = field(default_factory=list)
    recommended_action: str = ""

    def to_dict(self) -> dict:
        return {
            "id": self.id,
            "researcher_id": self.researcher_id,
            "grant_id": self.grant_id,
            "grant_title": self.grant_title,
            "agency": self.agency,
            "country": self.country,
            "funding": self.funding,
            "deadline": self.deadline,
            "match_score": self.match_score,
            "priority_score": self.priority_score,
            "why_this_grant": self.why_this_grant,
            "recommended_action": self.recommended_action,
        }


@dataclass
class Notification:
    id: int
    researcher_id: int
    title: str
    message: str
    grant_title: str
    agency: str
    match_score: Optional[int] = None
    priority_score: Optional[int] = None
    urgency: Optional[str] = None
    days_left: Optional[int] = None
    read: bool = False

    def to_dict(self) -> dict:
        return {
            "id": self.id,
            "researcher_id": self.researcher_id,
            "title": self.title,
            "message": self.message,
            "grant_title": self.grant_title,
            "agency": self.agency,
            "match_score": self.match_score,
            "priority_score": self.priority_score,
            "urgency": self.urgency,
            "days_left": self.days_left,
            "read": self.read,
        }
