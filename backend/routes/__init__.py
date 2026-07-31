"""
Routes package initialization.
"""

from .ai import router as ai_router
from .grants import router as grants_router
from .researchers import router as researchers_router
from .matches import router as matches_router
from .notifications import router as notifications_router
from .planning import router as planning_router

__all__ = [
    "ai_router",
    "grants_router",
    "researchers_router",
    "matches_router",
    "notifications_router",
    "planning_router",
]
