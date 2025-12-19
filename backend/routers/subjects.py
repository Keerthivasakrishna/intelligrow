from fastapi import APIRouter, HTTPException
from database import supabase
from models import Subject
from typing import List

router = APIRouter(prefix="/api/subjects", tags=["subjects"])


@router.get("", response_model=List[Subject])
async def get_all_subjects():
    """Get all available subjects (DSA, OS, CN)."""
    try:
        response = supabase.table("subjects").select("*").execute()
        return response.data if response.data else []
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch subjects: {str(e)}")
