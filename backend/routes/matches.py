"""
routes/matches.py

API endpoints for grant-researcher match management and AI matching service.
"""

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Union, Any, Dict
import sys
import os

# Ensure backend directory is in search path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))
import database
from schemas.match import MatchCreate, MatchResponse
from agents.matching_agent.service import run_matching_agent
from agents.grant_agent.service import run_grant_discovery

router = APIRouter(prefix="/api/matches", tags=["Matches"])


class KeywordMatchRequest(BaseModel):
    keywords: List[str]


@router.get("/", response_model=List[MatchResponse])
async def list_matches():
    """
    Retrieve all saved matches.
    """
    return database.get_all_matches()


@router.get("/researcher/{researcher_id}", response_model=List[MatchResponse])
async def get_matches_for_researcher(researcher_id: int):
    """
    Retrieve all matches for a specific researcher.
    """
    researcher = database.get_researcher(researcher_id)
    if not researcher:
        raise HTTPException(status_code=404, detail=f"Researcher with id {researcher_id} not found")
    return database.get_matches_for_researcher(researcher_id)


@router.post("/run", tags=["Matches"])
async def run_keyword_matching(payload: KeywordMatchRequest):
    """
    Dynamically discover grants and run AI matching agent based on input keywords.
    """
    researcher = {
        "research_areas": payload.keywords,
        "skills": payload.keywords,
        "publications": [],
        "career_stage": "Student"
    }

    grants = run_grant_discovery()
    matches = run_matching_agent(researcher, grants)

    return {
        "status": "success",
        "matches": matches
    }


@router.post("/", status_code=201)
async def create_or_calculate_match(payload: Dict[str, Any]):
    """
    Create a new match record OR run keyword matching if 'keywords' is passed.
    """
    if "keywords" in payload:
        keywords = payload["keywords"]
        researcher = {
            "research_areas": keywords,
            "skills": keywords,
            "publications": [],
            "career_stage": "Student"
        }
        grants = run_grant_discovery()
        matches = run_matching_agent(researcher, grants)
        return {
            "status": "success",
            "matches": matches
        }
    
    # Otherwise treat as MatchCreate
    match_schema = MatchCreate(**payload)
    data = match_schema.model_dump()
    return database.create_match(data)


@router.delete("/{match_id}")
async def delete_match(match_id: int):
    """
    Delete a match by ID.
    """
    deleted = database.delete_match(match_id)
    if not deleted:
        raise HTTPException(status_code=404, detail=f"Match with id {match_id} not found")
    return {"status": "deleted", "id": match_id}
