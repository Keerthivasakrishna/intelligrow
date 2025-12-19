from fastapi import APIRouter, Depends, HTTPException
from typing import Dict, Any
from auth import get_current_user
from database import supabase
from models import User, UserStats

router = APIRouter(prefix="/api/users", tags=["users"])


@router.get("/me", response_model=User)
async def get_my_profile(current_user: Dict[str, Any] = Depends(get_current_user)):
    """Get current user profile with XP and pet level."""
    try:
        # Query user from public.users table
        response = supabase.table("users").select("*").eq("id", current_user["user_id"]).execute()
        
        if response.data and len(response.data) > 0:
            return response.data[0]
        else:
            # User doesn't exist in public.users yet, return basic info
            # This will be created when they complete their first quiz
            return {
                "id": current_user["user_id"],
                "email": current_user["email"],
                "full_name": current_user["full_name"],
                "avatar_url": current_user["avatar_url"],
                "xp": 0,
                "pet_level": 1
            }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch user profile: {str(e)}")


@router.get("/stats", response_model=UserStats)
async def get_user_stats(current_user: Dict[str, Any] = Depends(get_current_user)):
    """Get user statistics including strengths and weaknesses."""
    try:
        user_id = current_user["user_id"]
        
        # Get user XP and level
        user_response = supabase.table("users").select("xp, pet_level").eq("id", user_id).execute()
        
        if not user_response.data or len(user_response.data) == 0:
            # User hasn't completed any quizzes yet
            return {
                "xp": 0,
                "pet_level": 1,
                "xp_to_next_level": 100,
                "total_completed": 0,
                "strengths": [],
                "weaknesses": []
            }
        
        user_data = user_response.data[0]
        xp = user_data["xp"]
        pet_level = user_data["pet_level"]
        
        # Calculate XP to next level (every 100 XP)
        xp_to_next_level = 100 - (xp % 100)
        
        # Get completed topics with scores
        progress_response = supabase.table("topic_progress")\
            .select("topic_id, quiz_score, topics(title)")\
            .eq("user_id", user_id)\
            .eq("quiz_completed", True)\
            .order("quiz_score", desc=True)\
            .execute()
        
        total_completed = len(progress_response.data) if progress_response.data else 0
        
        # Calculate strengths (top 3 scores) and weaknesses (bottom 3 scores)
        strengths = []
        weaknesses = []
        
        if progress_response.data and len(progress_response.data) > 0:
            # Strengths: top 3
            for item in progress_response.data[:3]:
                strengths.append({
                    "topic_id": item["topic_id"],
                    "title": item["topics"]["title"] if item.get("topics") else "Unknown",
                    "score": item["quiz_score"]
                })
            
            # Weaknesses: bottom 3 (reverse order)
            if len(progress_response.data) >= 3:
                for item in reversed(progress_response.data[-3:]):
                    weaknesses.append({
                        "topic_id": item["topic_id"],
                        "title": item["topics"]["title"] if item.get("topics") else "Unknown",
                        "score": item["quiz_score"]
                    })
        
        return {
            "xp": xp,
            "pet_level": pet_level,
            "xp_to_next_level": xp_to_next_level,
            "total_completed": total_completed,
            "strengths": strengths,
            "weaknesses": weaknesses
        }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch user stats: {str(e)}")
