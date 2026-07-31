"""
routes/notifications.py

API endpoints for notification management.
"""

from fastapi import APIRouter, HTTPException
from typing import List
import sys
import os

# Ensure backend directory is in search path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))
import database
from schemas.notification import NotificationCreate, NotificationResponse

router = APIRouter(prefix="/api/notifications", tags=["Notifications"])


@router.get("/", response_model=List[NotificationResponse])
async def list_notifications():
    """
    Retrieve all notifications.
    """
    return database.get_all_notifications()


@router.get("/researcher/{researcher_id}", response_model=List[NotificationResponse])
async def get_notifications_for_researcher(researcher_id: int):
    """
    Retrieve all notifications for a specific researcher.
    """
    researcher = database.get_researcher(researcher_id)
    if not researcher:
        raise HTTPException(status_code=404, detail=f"Researcher with id {researcher_id} not found")
    return database.get_notifications_for_researcher(researcher_id)


@router.post("/", response_model=NotificationResponse, status_code=201)
async def create_notification(payload: NotificationCreate):
    """
    Create a new notification.
    """
    data = payload.model_dump()
    return database.create_notification(data)


@router.patch("/{notification_id}/read", response_model=NotificationResponse)
async def mark_notification_read(notification_id: int):
    """
    Mark a notification as read.
    """
    updated = database.mark_notification_read(notification_id)
    if not updated:
        raise HTTPException(status_code=404, detail=f"Notification with id {notification_id} not found")
    return updated


@router.delete("/{notification_id}")
async def delete_notification(notification_id: int):
    """
    Delete a notification by ID.
    """
    deleted = database.delete_notification(notification_id)
    if not deleted:
        raise HTTPException(status_code=404, detail=f"Notification with id {notification_id} not found")
    return {"status": "deleted", "id": notification_id}
