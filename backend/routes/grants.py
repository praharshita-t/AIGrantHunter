"""
routes/grants.py

CRUD API endpoints for grant management.
"""

from fastapi import APIRouter, HTTPException
from typing import List
import sys
import os

# Ensure backend directory is in search path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))
import database
from schemas.grant import GrantCreate, GrantUpdate, GrantResponse

router = APIRouter(prefix="/api/grants", tags=["Grants"])


@router.get("/", response_model=List[GrantResponse])
async def list_grants():
    """
    Retrieve all grants.
    """
    return database.get_all_grants()


@router.get("/{grant_id}", response_model=GrantResponse)
async def get_grant(grant_id: int):
    """
    Retrieve a single grant by ID.
    """
    grant = database.get_grant(grant_id)
    if not grant:
        raise HTTPException(status_code=404, detail=f"Grant with id {grant_id} not found")
    return grant


@router.post("/", response_model=GrantResponse, status_code=201)
async def create_grant(payload: GrantCreate):
    """
    Create a new grant entry.
    """
    data = payload.model_dump()
    return database.create_grant(data)


@router.put("/{grant_id}", response_model=GrantResponse)
async def update_grant(grant_id: int, payload: GrantUpdate):
    """
    Update an existing grant.
    """
    data = payload.model_dump(exclude_unset=True)
    updated = database.update_grant(grant_id, data)
    if not updated:
        raise HTTPException(status_code=404, detail=f"Grant with id {grant_id} not found")
    return updated


@router.delete("/{grant_id}")
async def delete_grant(grant_id: int):
    """
    Delete a grant by ID.
    """
    deleted = database.delete_grant(grant_id)
    if not deleted:
        raise HTTPException(status_code=404, detail=f"Grant with id {grant_id} not found")
    return {"status": "deleted", "id": grant_id}
