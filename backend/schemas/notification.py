"""
schemas/notification.py

Pydantic request/response schemas for notification endpoints.
"""

from pydantic import BaseModel, ConfigDict, Field
from typing import Optional


class NotificationCreate(BaseModel):
    researcher_id: int
    title: str
    message: str
    grant_title: str
    agency: str
    match_score: Optional[int] = Field(None, ge=0, le=100)
    priority_score: Optional[int] = Field(None, ge=0, le=100)
    urgency: Optional[str] = None
    days_left: Optional[int] = None


class NotificationResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    researcher_id: int
    title: str
    message: str
    grant_title: str
    agency: str
    match_score: Optional[int] = None
    priority_score: Optional[int] = None
    urgency: Optional[str] = None
    days_left: Optional[int] = None
    read: bool
