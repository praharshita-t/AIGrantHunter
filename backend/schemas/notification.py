"""
schemas/notification.py

Pydantic request/response schemas for notification endpoints.
"""

from pydantic import BaseModel, Field
from typing import Optional


class NotificationCreate(BaseModel):
    researcher_id: int = Field(..., example=1)
    title: str = Field(..., example="🚨 High Priority Grant Found")
    message: str = Field(..., example="AI for Healthcare is a critical priority grant with 10 days remaining.")
    grant_title: str = Field(..., example="AI for Healthcare")
    agency: str = Field(..., example="NSF")
    match_score: Optional[int] = Field(None, ge=0, le=100, example=92)
    priority_score: Optional[int] = Field(None, ge=0, le=100, example=88)
    urgency: Optional[str] = Field(None, example="Critical")
    days_left: Optional[int] = Field(None, example=10)


class NotificationResponse(BaseModel):
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

    class Config:
        from_attributes = True
