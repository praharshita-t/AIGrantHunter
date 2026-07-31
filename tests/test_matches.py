"""
tests/test_matches.py

Unit tests for the match endpoints.
"""

import os
import sys
import pytest
from fastapi.testclient import TestClient

# Ensure workspace root is in sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from backend.app import app
from backend import database


@pytest.fixture(autouse=True)
def reset_db():
    """Reset the in-memory database before each test."""
    database._researchers.clear()
    database._matches.clear()
    database._counters["researcher"] = 0
    database._counters["match"] = 0
    yield
    database._researchers.clear()
    database._matches.clear()
    database._counters["researcher"] = 0
    database._counters["match"] = 0


client = TestClient(app)


SAMPLE_MATCH = {
    "researcher_id": 1,
    "grant_id": 101,
    "grant_title": "AI for Healthcare",
    "agency": "NSF",
    "country": "USA",
    "funding": "$100,000",
    "deadline": "2026-09-30",
    "match_score": 92,
    "priority_score": 88,
    "why_this_grant": ["Strong overlap in AI research"],
    "recommended_action": "High priority – prepare application",
}


def _create_researcher():
    """Helper to create a researcher so match endpoints that verify researcher exist pass."""
    database.create_researcher({
        "name": "Dr. Test",
        "institution": "Test University",
        "career_stage": "Postdoc",
        "research_areas": ["AI"],
        "skills": [],
        "publications": [],
        "preferred_countries": [],
        "email": None,
    })


def test_create_match():
    response = client.post("/api/matches/", json=SAMPLE_MATCH)
    assert response.status_code == 201
    data = response.json()
    assert data["grant_title"] == "AI for Healthcare"
    assert data["match_score"] == 92


def test_list_matches():
    client.post("/api/matches/", json=SAMPLE_MATCH)
    response = client.get("/api/matches/")
    assert response.status_code == 200
    assert len(response.json()) == 1


def test_get_matches_for_researcher():
    _create_researcher()
    client.post("/api/matches/", json=SAMPLE_MATCH)
    response = client.get("/api/matches/researcher/1")
    assert response.status_code == 200
    assert len(response.json()) == 1


def test_get_matches_for_nonexistent_researcher():
    response = client.get("/api/matches/researcher/999")
    assert response.status_code == 404


def test_delete_match():
    client.post("/api/matches/", json=SAMPLE_MATCH)
    response = client.delete("/api/matches/1")
    assert response.status_code == 200
    assert response.json()["status"] == "deleted"
