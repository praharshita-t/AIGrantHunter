import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import sys
import os

# Ensure backend directory is in search path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from routes.ai import router as ai_router
from routes.grants import router as grants_router
from routes.researchers import router as researchers_router
from routes.matches import router as matches_router
from routes.notifications import router as notifications_router

app = FastAPI(
    title="AI Grant Opportunity Hunter Backend",
    description="Backend services and API endpoints for the AI Grant Opportunity Hunter platform",
    version="1.0.0"
)

# CORS middleware for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
app.include_router(ai_router)
app.include_router(grants_router)
app.include_router(researchers_router)
app.include_router(matches_router)
app.include_router(notifications_router)

@app.get("/")
async def root():
    return {
        "app": "AI Grant Opportunity Hunter API",
        "status": "healthy"
    }

if __name__ == "__main__":
    # Run server locally on port 8000
    uvicorn.run("app:app", host="127.0.0.1", port=8000, reload=True)
