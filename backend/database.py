"""
database.py

In-memory data store for the AI Grant Hunter backend.
Provides simple list-based storage for researchers, grants,
matches, and notifications during development / prototype phase.
"""

from typing import List, Dict, Any

# ---------------------------------------------------------------------------
# In-memory stores
# ---------------------------------------------------------------------------

_researchers: List[Dict[str, Any]] = []
_grants: List[Dict[str, Any]] = []
_matches: List[Dict[str, Any]] = []
_notifications: List[Dict[str, Any]] = []

# Auto-increment ID counters
_counters: Dict[str, int] = {
    "researcher": 0,
    "grant": 0,
    "match": 0,
    "notification": 0,
}


def _next_id(entity: str) -> int:
    _counters[entity] += 1
    return _counters[entity]


# ---------------------------------------------------------------------------
# Researcher helpers
# ---------------------------------------------------------------------------

def get_all_researchers() -> List[Dict[str, Any]]:
    return list(_researchers)


def get_researcher(researcher_id: int) -> Dict[str, Any] | None:
    return next((r for r in _researchers if r["id"] == researcher_id), None)


def create_researcher(data: Dict[str, Any]) -> Dict[str, Any]:
    record = {"id": _next_id("researcher"), **data}
    _researchers.append(record)
    return record


def update_researcher(researcher_id: int, data: Dict[str, Any]) -> Dict[str, Any] | None:
    for i, r in enumerate(_researchers):
        if r["id"] == researcher_id:
            _researchers[i] = {**r, **data, "id": researcher_id}
            return _researchers[i]
    return None


def delete_researcher(researcher_id: int) -> bool:
    global _researchers
    before = len(_researchers)
    _researchers = [r for r in _researchers if r["id"] != researcher_id]
    return len(_researchers) < before


# ---------------------------------------------------------------------------
# Grant helpers
# ---------------------------------------------------------------------------

def get_all_grants() -> List[Dict[str, Any]]:
    return list(_grants)


def get_grant(grant_id: int) -> Dict[str, Any] | None:
    return next((g for g in _grants if g["id"] == grant_id), None)


def create_grant(data: Dict[str, Any]) -> Dict[str, Any]:
    record = {"id": _next_id("grant"), **data}
    _grants.append(record)
    return record


def update_grant(grant_id: int, data: Dict[str, Any]) -> Dict[str, Any] | None:
    for i, g in enumerate(_grants):
        if g["id"] == grant_id:
            _grants[i] = {**g, **data, "id": grant_id}
            return _grants[i]
    return None


def delete_grant(grant_id: int) -> bool:
    global _grants
    before = len(_grants)
    _grants = [g for g in _grants if g["id"] != grant_id]
    return len(_grants) < before


# ---------------------------------------------------------------------------
# Match helpers
# ---------------------------------------------------------------------------

def get_all_matches() -> List[Dict[str, Any]]:
    return list(_matches)


def get_matches_for_researcher(researcher_id: int) -> List[Dict[str, Any]]:
    return [m for m in _matches if m["researcher_id"] == researcher_id]


def create_match(data: Dict[str, Any]) -> Dict[str, Any]:
    record = {"id": _next_id("match"), **data}
    _matches.append(record)
    return record


def delete_match(match_id: int) -> bool:
    global _matches
    before = len(_matches)
    _matches = [m for m in _matches if m["id"] != match_id]
    return len(_matches) < before


# ---------------------------------------------------------------------------
# Notification helpers
# ---------------------------------------------------------------------------

def get_all_notifications() -> List[Dict[str, Any]]:
    return list(_notifications)


def get_notifications_for_researcher(researcher_id: int) -> List[Dict[str, Any]]:
    return [n for n in _notifications if n["researcher_id"] == researcher_id]


def create_notification(data: Dict[str, Any]) -> Dict[str, Any]:
    record = {"id": _next_id("notification"), "read": False, **data}
    _notifications.append(record)
    return record


def mark_notification_read(notification_id: int) -> Dict[str, Any] | None:
    for n in _notifications:
        if n["id"] == notification_id:
            n["read"] = True
            return n
    return None


def delete_notification(notification_id: int) -> bool:
    global _notifications
    before = len(_notifications)
    _notifications = [n for n in _notifications if n["id"] != notification_id]
    return len(_notifications) < before


def clear_all_data():
    global _researchers, _grants, _matches, _notifications
    _researchers.clear()
    _grants.clear()
    _matches.clear()
    _notifications.clear()
    _counters["researcher"] = 0
    _counters["grant"] = 0
    _counters["match"] = 0
    _counters["notification"] = 0
