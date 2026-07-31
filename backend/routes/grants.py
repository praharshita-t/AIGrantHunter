"""
routes/grants.py

CRUD and Discovery API endpoints for grant management.
"""

import os
import sys
from typing import List
from fastapi import APIRouter, HTTPException

# Ensure backend and root directory are in search path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "../..")))

from backend import database
from backend.schemas.grant import GrantCreate, GrantUpdate, GrantResponse
from agents.grant_agent.service import run_grant_discovery

router = APIRouter(prefix="/api/grants", tags=["Grants"])


@router.get("/discover")
async def discover_grants():
    """
    Scrape, extract, and match active grant opportunities from NSF, ANRF, and UKRI.
    """
    # 1. Run discovery scrapers
    grants = run_grant_discovery()

    # 2. Get latest researcher from DB
    researchers = database.get_all_researchers()
    researcher = researchers[-1] if researchers else None

    from agents.extraction_agent.extractor import run_extraction
    from backend.routes.pipeline import fetch_webpage_text
    from agents.matching_agent.service import run_matching_agent

    enriched_grants = []
    for g in grants:
        # Check if already saved in DB to optimize performance
        existing = next((dg for dg in database.get_all_grants() if dg["url"] == g["url"]), None)
        if existing:
            g = existing
        else:
            # Run webpage text fetching + extraction
            page_text = fetch_webpage_text(g["url"])
            if not page_text:
                page_text = f"Opportunity Title: {g['title']}. Hosted by: {g['agency']}. URL: {g['url']}."
            extracted = run_extraction(page_text)
            
            g = {
                "agency": g["agency"],
                "title": extracted.get("title") if extracted.get("title") != "Not Available" else g["title"],
                "url": g["url"],
                "funding": extracted.get("funding_amount") if extracted.get("funding_amount") != "Not Available" else "Not Available",
                "deadline": extracted.get("deadline") if extracted.get("deadline") != "Not Available" else "Not Available",
                "research_areas": extracted.get("research_areas") or [],
                "required_documents": extracted.get("required_documents") or [],
                "country": extracted.get("country") if extracted.get("country") != "Not Available" else "Not Available",
                "description": extracted.get("eligibility") if extracted.get("eligibility") != "Not Available" else "Not Available"
            }
            database.create_grant(g)

        # 3. Calculate match score if researcher is available
        if researcher:
            matches = run_matching_agent(researcher, [g])
            if matches:
                m = matches[0]
                g["match_score"] = m["match_score"]
                g["priority_score"] = m["priority_score"]
                g["why_this_grant"] = m["why_this_grant"]
                g["recommended_action"] = m["recommended_action"]
        else:
            g["match_score"] = 0
            g["priority_score"] = 0
            g["why_this_grant"] = ["Submit research profile to compute alignment."]
            g["recommended_action"] = "Submit profile"

        enriched_grants.append(g)

    return {
        "status": "success",
        "count": len(enriched_grants),
        "grants": enriched_grants
    }


@router.get("/", response_model=List[GrantResponse])
async def list_grants():
    """
    Retrieve all stored grants.
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


@router.post("/extract")
async def extract_grants(payload: List[dict]):
    """
    Normalize and extract details using the Stage 2 Extraction Agent for each grant.
    """
    from agents.extraction_agent.extractor import run_extraction
    extracted_list = []
    for g in payload:
        if "research_areas" not in g or not g["research_areas"] or g.get("funding") == "Not Available":
            # Extract details using AI
            simulated_text = f"Opportunity Title: {g.get('title', 'Not Available')}. Hosted by: {g.get('agency', 'Not Available')}. URL: {g.get('url', '')}."
            extracted = run_extraction(simulated_text)
            
            # Map extracted details
            g["title"] = extracted.get("title") if extracted.get("title") != "Not Available" else g.get("title")
            g["funding"] = extracted.get("funding_amount", "Not Available")
            g["deadline"] = extracted.get("deadline", "Not Available")
            g["research_areas"] = extracted.get("research_areas") or []
            g["required_documents"] = extracted.get("required_documents") or []
            g["country"] = extracted.get("country", "Not Available")
            g["agency"] = extracted.get("funding_agency") if extracted.get("funding_agency") != "Not Available" else g.get("agency")
            g["description"] = extracted.get("eligibility", "Not Available")
        extracted_list.append(g)
    return {"status": "success", "grants": extracted_list}
