
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import time

app = FastAPI()

# Enable CORS for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify the actual frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Data Models ---

class Resource(BaseModel):
    id: int
    title: str
    type: str
    likes: int
    author: str
    url: str
    tags: List[str]

class ResourceCreate(BaseModel):
    title: str
    type: str
    url: str
    tags: List[str]

class Reputation(BaseModel):
    avg: float
    count: int

class RatingSubmit(BaseModel):
    score: int

class ProgressUpdate(BaseModel):
    increment: int

# --- In-Memory "Database" ---

db = {
    "resources": [
        { "id": 1, "title": "Mastering C Pointers - Visual Guide", "type": 'video', "likes": 124, "author": "CodeWithTahir", "url": "https://youtube.com/watch?v=zuegQmMdy8M", "tags": ["C", "Pointers"] },
        { "id": 2, "title": "Flexbox vs Grid: Comprehensive Cheatsheet", "type": 'article', "likes": 89, "author": "Sara_Dev", "url": "https://css-tricks.com/snippets/css/a-guide-to-flexbox/", "tags": ["CSS", "Frontend"] },
        { "id": 3, "title": "Understanding JS Event Loop in 5 minutes", "type": 'video', "likes": 210, "author": "JSNinja", "url": "https://www.youtube.com/watch?v=8aGhZQkoFbQ", "tags": ["JavaScript"] }
    ],
    "reputation": { "avg": 4.88, "count": 48 },
    "progress": 0
}

# --- Endpoints ---

@app.get("/api/resources")
async def get_resources():
    return sorted(db["resources"], key=lambda x: x["likes"], reverse=True)

@app.post("/api/resources")
async def create_resource(item: ResourceCreate):
    new_res = {
        "id": int(time.time()),
        "title": item.title,
        "type": item.type,
        "likes": 0,
        "author": "You (Student)",
        "url": item.url,
        "tags": item.tags
    }
    db["resources"].append(new_res)
    return new_res

@app.post("/api/resources/{resource_id}/like")
async def like_resource(resource_id: int):
    for res in db["resources"]:
        if res["id"] == resource_id:
            res["likes"] += 1
            return {"likes": res["likes"]}
    raise HTTPException(status_code=404, detail="Resource not found")

@app.get("/api/reputation")
async def get_reputation():
    return db["reputation"]

@app.post("/api/reputation/rate")
async def rate_reputation(rating: RatingSubmit):
    current = db["reputation"]
    new_count = current["count"] + 1
    new_avg = ((current["avg"] * current["count"]) + rating.score) / new_count
    db["reputation"] = { "avg": round(new_avg, 2), "count": new_count }
    return db["reputation"]

@app.get("/api/progress")
async def get_progress():
    return {"progress": db["progress"]}

@app.post("/api/progress/update")
async def update_progress(data: ProgressUpdate):
    db["progress"] = min(db["progress"] + data.increment, 100)
    return {"progress": db["progress"]}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
