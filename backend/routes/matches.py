from fastapi import APIRouter
from pydantic import BaseModel
from typing import List

from agents.matching_agent.service import run_matching_agent
from agents.grant_agent.service import run_grant_discovery

router = APIRouter(
    prefix="/api/matches",
    tags=["Matching"]
)

class MatchRequest(BaseModel):
    keywords: List[str]


@router.post("/")
async def match(payload: MatchRequest):

    researcher = {
        "research_areas": payload.keywords,
        "skills": payload.keywords,
        "publications": [],
        "career_stage": "Student"
    }

    grants = run_grant_discovery()

    matches = run_matching_agent(
        researcher,
        grants
    )

    return {
        "status": "success",
        "matches": matches
    }