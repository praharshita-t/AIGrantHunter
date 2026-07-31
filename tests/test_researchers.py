"""
tests/test_researchers.py

Unit tests for the researcher CRUD endpoints.
"""

import pytest
from fastapi.testclient import TestClient
import sys
import os

# Ensure backend is on path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "backend")))
from app import app
import database


@pytest.fixture(autouse=True)
def reset_db():
    """Reset the in-memory database before each test."""
    database._researchers.clear()
    database._counters["researcher"] = 0
    yield
    database._researchers.clear()
    database._counters["researcher"] = 0


client = TestClient(app)


SAMPLE_RESEARCHER = {
    "name": "Dr. Priya Sharma",
    "institution": "IIT Madras",
    "career_stage": "Postdoctoral Researcher",
    "research_areas": ["AI", "Healthcare"],
    "skills": ["Python", "Deep Learning"],
    "publications": ["AI-based Disease Prediction"],
    "preferred_countries": ["India", "European Union"],
    "email": "priya@iitm.ac.in",
}


def test_create_researcher():
    response = client.post("/api/researchers/", json=SAMPLE_RESEARCHER)
    assert response.status_code == 201
    data = response.json()
    assert data["name"] == "Dr. Priya Sharma"
    assert data["id"] == 1


def test_list_researchers():
    client.post("/api/researchers/", json=SAMPLE_RESEARCHER)
    response = client.get("/api/researchers/")
    assert response.status_code == 200
    assert len(response.json()) == 1


def test_get_researcher():
    client.post("/api/researchers/", json=SAMPLE_RESEARCHER)
    response = client.get("/api/researchers/1")
    assert response.status_code == 200
    assert response.json()["name"] == "Dr. Priya Sharma"


def test_get_researcher_not_found():
    response = client.get("/api/researchers/999")
    assert response.status_code == 404


def test_update_researcher():
    client.post("/api/researchers/", json=SAMPLE_RESEARCHER)
    response = client.put("/api/researchers/1", json={"name": "Dr. Priya S."})
    assert response.status_code == 200
    assert response.json()["name"] == "Dr. Priya S."
    assert response.json()["institution"] == "IIT Madras"  # unchanged


def test_delete_researcher():
    client.post("/api/researchers/", json=SAMPLE_RESEARCHER)
    response = client.delete("/api/researchers/1")
    assert response.status_code == 200
    assert response.json()["status"] == "deleted"

    # Verify it's gone
    response = client.get("/api/researchers/1")
    assert response.status_code == 404
