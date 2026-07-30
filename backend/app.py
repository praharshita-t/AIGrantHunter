import uvicorn
from fastapi import FastAPI
import sys
import os

# Ensure backend directory is in search path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from routes.ai import router as ai_router

app = FastAPI(
    title="AI Grant Opportunity Hunter Backend",
    description="Backend services and API endpoints for the AI Grant Opportunity Hunter platform",
    version="1.0.0"
)

# Register routers
app.include_router(ai_router)

@app.get("/")
async def root():
    return {
        "app": "AI Grant Opportunity Hunter API",
        "status": "healthy"
    }

if __name__ == "__main__":
    # Run server locally on port 8000
    uvicorn.run("app:app", host="127.0.0.1", port=8000, reload=True)
