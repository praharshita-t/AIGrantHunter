"""
routes/researchers.py

CRUD API endpoints for researcher management.
"""

import os
import sys
from typing import List
from fastapi import APIRouter, HTTPException

# Ensure backend and root directory are in search path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "../..")))

from backend import database
from backend.schemas.researcher import ResearcherCreate, ResearcherUpdate, ResearcherResponse

router = APIRouter(prefix="/api/researchers", tags=["Researchers"])


@router.get("/", response_model=List[ResearcherResponse])
async def list_researchers():
    """
    Retrieve all researchers.
    """
    return database.get_all_researchers()


@router.get("/{researcher_id}", response_model=ResearcherResponse)
async def get_researcher(researcher_id: int):
    """
    Retrieve a single researcher by ID.
    """
    researcher = database.get_researcher(researcher_id)
    if not researcher:
        raise HTTPException(status_code=404, detail=f"Researcher with id {researcher_id} not found")
    return researcher


@router.post("/", response_model=ResearcherResponse, status_code=201)
async def create_researcher(payload: ResearcherCreate):
    """
    Create a new researcher profile.
    """
    data = payload.model_dump()
    return database.create_researcher(data)


@router.put("/{researcher_id}", response_model=ResearcherResponse)
async def update_researcher(researcher_id: int, payload: ResearcherUpdate):
    """
    Update an existing researcher profile.
    """
    data = payload.model_dump(exclude_unset=True)
    updated = database.update_researcher(researcher_id, data)
    if not updated:
        raise HTTPException(status_code=404, detail=f"Researcher with id {researcher_id} not found")
    return updated


@router.delete("/{researcher_id}")
async def delete_researcher(researcher_id: int):
    """
    Delete a researcher by ID.
    """
    deleted = database.delete_researcher(researcher_id)
    if not deleted:
        raise HTTPException(status_code=404, detail=f"Researcher with id {researcher_id} not found")
    return {"status": "deleted", "id": researcher_id}
