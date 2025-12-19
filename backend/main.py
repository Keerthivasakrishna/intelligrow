from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import users, subjects, topics, quiz

app = FastAPI(
    title="IntelliGrow API",
    description="Gamified learning platform for Computer Science topics",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
app.include_router(users.router)
app.include_router(subjects.router)
app.include_router(topics.router)
app.include_router(quiz.router)


@app.get("/health")
async def health_check():
    """Health check endpoint."""
    return {"status": "healthy", "service": "IntelliGrow API"}


@app.get("/")
async def root():
    """Root endpoint."""
    return {
        "message": "Welcome to IntelliGrow API",
        "docs": "/docs",
        "health": "/health"
    }
