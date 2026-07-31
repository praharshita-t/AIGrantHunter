import os
import sys
import json
import asyncio
from typing import List, Optional, Dict, Any
from fastapi import APIRouter
from fastapi.responses import StreamingResponse
from pydantic import BaseModel

# Ensure project root is in path for imports
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "../..")))

from backend import database
from agents.grant_agent.nsf import scrape_nsf
from agents.grant_agent.anrf import scrape_anrf
from agents.grant_agent.ukri import scrape_ukri
from agents.extraction_agent.extractor import run_extraction
from agents.matching_agent.service import run_matching_agent
from agents.planning_agent.service import generate_ai_advisor_report

router = APIRouter(
    prefix="/api/pipeline",
    tags=["Pipeline Orchestrator"]
)

class PipelineRunRequest(BaseModel):
    name: str
    institution: str
    career_stage: str
    research_areas: List[str]
    skills: List[str]
    publications: List[str]
    preferred_countries: List[str]
    email: Optional[str] = None
    institution_type: Optional[str] = None
    research_experience: Optional[str] = None
    highest_degree: Optional[str] = None
    funding_history: Optional[List[Dict[str, Any]]] = None

def fetch_webpage_text(url: str) -> str:
    try:
        import requests
        from bs4 import BeautifulSoup
        headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        }
        res = requests.get(url, headers=headers, timeout=10)
        res.raise_for_status()
        soup = BeautifulSoup(res.text, "lxml")
        for s in soup(["script", "style", "nav", "footer", "header"]):
            s.decompose()
        return soup.get_text()
    except Exception as e:
        print(f"Error fetching page {url}: {e}")
        return ""

def sse_event(event_type: str, data: dict) -> str:
    return f"data: {json.dumps({'event': event_type, **data})}\n\n"

@router.post("/run")
async def run_pipeline(payload: PipelineRunRequest):
    """
    Unified streaming endpoint performing Grant Discovery, Extraction, Matching,
    and Advisor Planning, yielding progress updates and logs.
    """
    async def event_generator():
        # 1. Clear database
        yield sse_event("log", {"stage": "profile", "level": "INFO", "message": "Clearing previous run database..."})
        database.clear_all_data()

        # 2. Save researcher
        researcher_data = payload.model_dump()
        researcher = database.create_researcher(researcher_data)
        researcher_id = researcher["id"]
        yield sse_event("log", {"stage": "profile", "level": "SUCCESS", "message": f"Research profile received for {payload.name}."})

        # 3. Discovery
        yield sse_event("progress", {"stage": "discovery", "progress": 10})
        yield sse_event("log", {"stage": "discovery", "level": "INFO", "message": "Starting Grant Discovery Agent..."})

        grants = []
        seen_urls = set()

        # Scrape NSF
        yield sse_event("log", {"stage": "discovery", "level": "INFO", "message": "Searching NSF..."})
        yield sse_event("progress", {"stage": "discovery", "progress": 30})
        try:
            nsf_grants = await asyncio.to_thread(scrape_nsf)
            for g in nsf_grants:
                if g["url"] not in seen_urls:
                    seen_urls.add(g["url"])
                    grants.append(g)
            yield sse_event("log", {"stage": "discovery", "level": "INFO", "message": f"Discovered {len(nsf_grants)} grants from NSF."})
        except Exception as e:
            yield sse_event("log", {"stage": "discovery", "level": "ERROR", "message": f"NSF scraping failed: {str(e)}"})

        # Scrape ANRF
        yield sse_event("log", {"stage": "discovery", "level": "INFO", "message": "Searching ANRF..."})
        yield sse_event("progress", {"stage": "discovery", "progress": 60})
        try:
            anrf_grants = await asyncio.to_thread(scrape_anrf)
            for g in anrf_grants:
                if g["url"] not in seen_urls:
                    seen_urls.add(g["url"])
                    grants.append(g)
            yield sse_event("log", {"stage": "discovery", "level": "INFO", "message": f"Discovered {len(anrf_grants)} grants from ANRF."})
        except Exception as e:
            yield sse_event("log", {"stage": "discovery", "level": "ERROR", "message": f"ANRF scraping failed: {str(e)}"})

        # Scrape UKRI
        yield sse_event("log", {"stage": "discovery", "level": "INFO", "message": "Searching UKRI..."})
        yield sse_event("progress", {"stage": "discovery", "progress": 90})
        try:
            ukri_grants = await asyncio.to_thread(scrape_ukri)
            for g in ukri_grants:
                if g["url"] not in seen_urls:
                    seen_urls.add(g["url"])
                    grants.append(g)
            yield sse_event("log", {"stage": "discovery", "level": "INFO", "message": f"Discovered {len(ukri_grants)} grants from UKRI."})
        except Exception as e:
            yield sse_event("log", {"stage": "discovery", "level": "ERROR", "message": f"UKRI scraping failed: {str(e)}"})

        yield sse_event("progress", {"stage": "discovery", "progress": 100})
        yield sse_event("log", {"stage": "discovery", "level": "SUCCESS", "message": f"Discovery complete. Discovered {len(grants)} raw grants."})

        # 4. Extraction
        yield sse_event("progress", {"stage": "extraction", "progress": 0})
        yield sse_event("log", {"stage": "extraction", "level": "INFO", "message": "Starting Extraction Agent..."})
        yield sse_event("log", {"stage": "extraction", "level": "INFO", "message": f"Normalizing and extracting fields for {len(grants)} grants..."})

        extracted_grants = []
        for i, g in enumerate(grants):
            progress = int(10 + (i / len(grants)) * 90) if grants else 100
            yield sse_event("progress", {"stage": "extraction", "progress": progress})
            yield sse_event("log", {"stage": "extraction", "level": "INFO", "message": f"Extracting details for: {g['title']} ({g['agency']})..."})

            # Fetch the actual page content
            page_text = await asyncio.to_thread(fetch_webpage_text, g["url"])
            if not page_text:
                page_text = f"Opportunity Title: {g['title']}. Hosted by: {g['agency']}. URL: {g['url']}."

            extracted = await asyncio.to_thread(run_extraction, page_text)

            extracted_grant = {
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
            extracted_grants.append(extracted_grant)
            database.create_grant(extracted_grant)

        yield sse_event("progress", {"stage": "extraction", "progress": 100})
        yield sse_event("log", {"stage": "extraction", "level": "SUCCESS", "message": f"Extraction complete. Structured {len(extracted_grants)} grants."})

        # 5. Matching
        yield sse_event("progress", {"stage": "matching", "progress": 0})
        yield sse_event("log", {"stage": "matching", "level": "INFO", "message": "Starting Matching Agent..."})
        yield sse_event("log", {"stage": "matching", "level": "INFO", "message": "Computing semantic relevance via Qwen embeddings..."})
        yield sse_event("progress", {"stage": "matching", "progress": 50})

        matches = await asyncio.to_thread(run_matching_agent, researcher, extracted_grants)

        yield sse_event("log", {"stage": "matching", "level": "INFO", "message": "Running semantic matching..."})
        yield sse_event("progress", {"stage": "matching", "progress": 85})

        for match in matches:
            matched_grant = next((eg for eg in database.get_all_grants() if eg["title"] == match["title"]), None)
            grant_id = matched_grant["id"] if matched_grant else 0
            db_match = {
                "researcher_id": researcher_id,
                "grant_id": grant_id,
                "grant_title": match["title"],
                "agency": match["agency"],
                "country": match["country"],
                "funding": match["funding"],
                "deadline": match["deadline"],
                "match_score": match["match_score"],
                "priority_score": match["priority_score"],
                "why_this_grant": match["why_this_grant"],
                "recommended_action": match["recommended_action"]
            }
            database.create_match(db_match)

        yield sse_event("progress", {"stage": "matching", "progress": 100})
        yield sse_event("log", {"stage": "matching", "level": "SUCCESS", "message": f"Matching complete. Ranked {len(matches)} grants."})

        # 6. Planning
        yield sse_event("progress", {"stage": "planning", "progress": 0})
        yield sse_event("log", {"stage": "planning", "level": "INFO", "message": "Starting Planning Agent..."})

        advisor_recommendations = []
        for i, match in enumerate(matches):
            progress = int(10 + (i / len(matches)) * 90) if matches else 100
            yield sse_event("progress", {"stage": "planning", "progress": progress})
            yield sse_event("log", {"stage": "planning", "level": "INFO", "message": f"Calling Featherless AI to plan recommendation for {match['title']}..."})

            report = await asyncio.to_thread(generate_ai_advisor_report, researcher, match)

            rec = {
                "id": match.get("id") or f"rec-{i}",
                "title": match["title"],
                "agency": match["agency"],
                "funding": match["funding"],
                "deadline": match["deadline"],
                "country": match["country"],
                "matchScore": match["match_score"],
                "priorityScore": match["priority_score"],
                "category": report.get("category", "Good Fit"),
                "urgency": report.get("urgency", "Medium"),
                "summary": report.get("summary", ""),
                "whyFits": report.get("why_fits", ""),
                "eligibilityConcerns": report.get("eligibility_concerns", ""),
                "strategy": report.get("strategy", ""),
                "strengths": report.get("strengths", ""),
                "weaknesses": report.get("weaknesses", ""),
                "recommendedAction": report.get("recommended_action", ""),
                "checklist": report.get("checklist") or [],
                "requiredDocuments": report.get("required_documents") or [],
                "timeline": report.get("timeline") or []
            }
            advisor_recommendations.append(rec)

        if advisor_recommendations:
            top_rec = advisor_recommendations[0]
            database.create_notification({
                "researcher_id": researcher_id,
                "title": f"🚨 High Priority Grant Found" if top_rec["priorityScore"] >= 80 else "📢 New Grant Recommendation",
                "message": f"{top_rec['title']} ({top_rec['agency']}) matches your profile — {top_rec['matchScore']}% match.",
                "type": "match",
                "grant_title": top_rec["title"],
                "agency": top_rec["agency"],
                "match_score": top_rec["matchScore"],
                "priority_score": top_rec["priorityScore"],
                "urgency": top_rec["urgency"]
            })

        yield sse_event("progress", {"stage": "planning", "progress": 100})
        yield sse_event("log", {"stage": "planning", "level": "SUCCESS", "message": "Planning complete. Application strategies ready."})

        # Calculate final stats
        avg_score = round(sum(r["matchScore"] for r in advisor_recommendations) / len(advisor_recommendations)) if advisor_recommendations else 0
        top_funding = advisor_recommendations[0]["funding"] if advisor_recommendations else "Not Available"

        yield sse_event("summary", {
            "stats": {
                "grantsFound": len(advisor_recommendations),
                "avgMatch": avg_score,
                "funding": top_funding
            },
            "matches": advisor_recommendations
        })

        yield sse_event("complete", {})

    return StreamingResponse(event_generator(), media_type="text/event-stream")
