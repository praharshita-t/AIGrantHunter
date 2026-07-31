"""
tests/test_grants.py

Unit tests for the grant CRUD endpoints.
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
    database._grants.clear()
    database._counters["grant"] = 0
    yield
    database._grants.clear()
    database._counters["grant"] = 0


client = TestClient(app)


SAMPLE_GRANT = {
    "title": "AI for Healthcare",
    "agency": "NSF",
    "country": "USA",
    "funding": "$100,000",
    "deadline": "2026-09-30",
    "research_areas": ["AI", "Healthcare"],
    "required_documents": ["Proposal", "Budget", "CV"],
    "description": "Grant supporting AI research in healthcare",
    "source_url": "https://nsf.gov/grants/ai-healthcare",
}


def test_create_grant():
    response = client.post("/api/grants/", json=SAMPLE_GRANT)
    assert response.status_code == 201
    data = response.json()
    assert data["title"] == "AI for Healthcare"
    assert data["id"] == 1


def test_list_grants():
    client.post("/api/grants/", json=SAMPLE_GRANT)
    response = client.get("/api/grants/")
    assert response.status_code == 200
    assert len(response.json()) == 1


def test_get_grant():
    client.post("/api/grants/", json=SAMPLE_GRANT)
    response = client.get("/api/grants/1")
    assert response.status_code == 200
    assert response.json()["agency"] == "NSF"


def test_get_grant_not_found():
    response = client.get("/api/grants/999")
    assert response.status_code == 404


def test_update_grant():
    client.post("/api/grants/", json=SAMPLE_GRANT)
    response = client.put("/api/grants/1", json={"funding": "$200,000"})
    assert response.status_code == 200
    assert response.json()["funding"] == "$200,000"
    assert response.json()["title"] == "AI for Healthcare"  # unchanged


def test_delete_grant():
    client.post("/api/grants/", json=SAMPLE_GRANT)
    response = client.delete("/api/grants/1")
    assert response.status_code == 200
    assert response.json()["status"] == "deleted"

    # Verify it's gone
    response = client.get("/api/grants/1")
    assert response.status_code == 404
