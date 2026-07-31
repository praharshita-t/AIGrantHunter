from fastapi import APIRouter
import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "../..")))

from agents.grant_agent.service import run_grant_discovery

router = APIRouter(prefix="/api/grants", tags=["Grants"])


@router.get("/discover")
async def discover_grants():

    grants = run_grant_discovery()

    return {
        "status": "success",
        "count": len(grants),
        "grants": grants
    }