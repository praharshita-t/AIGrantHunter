import os
import sys
from fastapi import APIRouter
from pydantic import BaseModel

# Ensure project root is in path for agent imports
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "../..")))

from agents.planning_agent.service import run_planning_agent

router = APIRouter(
    prefix="/api/planning",
    tags=["Planning"]
)


class PlanningRequest(BaseModel):
    grant: dict


@router.post("/")
async def planning(payload: PlanningRequest):
    result = run_planning_agent(payload.grant)
    return result