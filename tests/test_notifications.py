"""
tests/test_notifications.py

Unit tests for the notification endpoints.
"""

import pytest
from fastapi.testclient import TestClient

from backend.app import app
from backend import database


@pytest.fixture(autouse=True)
def reset_db():
    """Reset the in-memory database before each test."""
    database._researchers.clear()
    database._notifications.clear()
    database._counters["researcher"] = 0
    database._counters["notification"] = 0
    yield
    database._researchers.clear()
    database._notifications.clear()
    database._counters["researcher"] = 0
    database._counters["notification"] = 0


client = TestClient(app)


SAMPLE_NOTIFICATION = {
    "researcher_id": 1,
    "title": "🚨 High Priority Grant Found",
    "message": "AI for Healthcare is a critical priority grant with 10 days remaining.",
    "grant_title": "AI for Healthcare",
    "agency": "NSF",
    "match_score": 92,
    "priority_score": 88,
    "urgency": "Critical",
    "days_left": 10,
}


def _create_researcher():
    """Helper to create a researcher for notification tests."""
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


def test_create_notification():
    response = client.post("/api/notifications/", json=SAMPLE_NOTIFICATION)
    assert response.status_code == 201
    data = response.json()
    assert data["title"] == "🚨 High Priority Grant Found"
    assert data["read"] is False


def test_list_notifications():
    client.post("/api/notifications/", json=SAMPLE_NOTIFICATION)
    response = client.get("/api/notifications/")
    assert response.status_code == 200
    assert len(response.json()) == 1


def test_get_notifications_for_researcher():
    _create_researcher()
    client.post("/api/notifications/", json=SAMPLE_NOTIFICATION)
    response = client.get("/api/notifications/researcher/1")
    assert response.status_code == 200
    assert len(response.json()) == 1


def test_get_notifications_for_nonexistent_researcher():
    response = client.get("/api/notifications/researcher/999")
    assert response.status_code == 404


def test_mark_notification_read():
    client.post("/api/notifications/", json=SAMPLE_NOTIFICATION)
    response = client.patch("/api/notifications/1/read")
    assert response.status_code == 200
    assert response.json()["read"] is True


def test_mark_notification_read_not_found():
    response = client.patch("/api/notifications/999/read")
    assert response.status_code == 404


def test_delete_notification():
    client.post("/api/notifications/", json=SAMPLE_NOTIFICATION)
    response = client.delete("/api/notifications/1")
    assert response.status_code == 200
    assert response.json()["status"] == "deleted"
