"""
routes/matches.py

API endpoints for grant-researcher match management.
"""

from fastapi import APIRouter, HTTPException
from typing import List
import sys
import os

# Ensure backend directory is in search path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))
import database
from schemas.match import MatchCreate, MatchResponse

router = APIRouter(prefix="/api/matches", tags=["Matches"])


@router.get("/", response_model=List[MatchResponse])
async def list_matches():
    """
    Retrieve all matches.
    """
    return database.get_all_matches()


@router.get("/researcher/{researcher_id}", response_model=List[MatchResponse])
async def get_matches_for_researcher(researcher_id: int):
    """
    Retrieve all matches for a specific researcher.
    """
    # Verify researcher exists
    researcher = database.get_researcher(researcher_id)
    if not researcher:
        raise HTTPException(status_code=404, detail=f"Researcher with id {researcher_id} not found")
    return database.get_matches_for_researcher(researcher_id)


@router.post("/", response_model=MatchResponse, status_code=201)
async def create_match(payload: MatchCreate):
    """
    Create a new match record.
    """
    data = payload.model_dump()
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
