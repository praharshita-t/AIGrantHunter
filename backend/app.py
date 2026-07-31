import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import sys
import os

# Ensure backend and root directories are in search path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from backend.routes import (
    ai_router,
    grants_router,
    researchers_router,
    matches_router,
    notifications_router,
    planning_router,
    pipeline_router,
)

app = FastAPI(
    title="AI Grant Opportunity Hunter Backend",
    description="Backend services and API endpoints for the AI Grant Opportunity Hunter platform",
    version="1.0.0"
)

# CORS middleware for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register all routes
app.include_router(ai_router)
app.include_router(grants_router)
app.include_router(researchers_router)
app.include_router(matches_router)
app.include_router(notifications_router)
app.include_router(planning_router)
app.include_router(pipeline_router)

@app.get("/")
async def root():
    return {
        "app": "AI Grant Opportunity Hunter API",
        "status": "healthy"
    }

if __name__ == "__main__":
    # Run server locally on port 8000
    uvicorn.run("app:app", host="127.0.0.1", port=8000, reload=True)
