from fastapi import APIRouter, Depends, HTTPException
from typing import Dict, Any
from auth import get_current_user
from database import supabase
from models import QuizSubmission, QuizResult, QuizQuestionWithAnswer
from datetime import datetime

router = APIRouter(prefix="/api/quiz", tags=["quiz"])


@router.post("/submit", response_model=QuizResult)
async def submit_quiz(
    submission: QuizSubmission,
    current_user: Dict[str, Any] = Depends(get_current_user)
):
    """
    Submit quiz answers and calculate score.
    Implements self-healing: automatically creates user record if it doesn't exist.
    Awards XP and levels up pet if score >= 80%.
    """
    try:
        user_id = current_user["user_id"]
        topic_id = submission.topic_id
        user_answers = submission.answers
        
        # SELF-HEALING LOGIC: Check if user exists in public.users, if not create it
        user_check = supabase.table("users").select("id").eq("id", user_id).execute()
        
        if not user_check.data or len(user_check.data) == 0:
            # User doesn't exist, create from auth metadata
            supabase.table("users").insert({
                "id": user_id,
                "email": current_user["email"],
                "full_name": current_user["full_name"],
                "avatar_url": current_user["avatar_url"],
                "xp": 0,
                "pet_level": 1
            }).execute()
        
        # Get quiz questions with correct answers
        questions_response = supabase.table("quiz_questions")\
            .select("*")\
            .eq("topic_id", topic_id)\
            .execute()
        
        if not questions_response.data:
            raise HTTPException(status_code=404, detail="Quiz questions not found")
        
        questions = questions_response.data
        
        # Calculate score
        if len(user_answers) != len(questions):
            raise HTTPException(
                status_code=400, 
                detail=f"Expected {len(questions)} answers, got {len(user_answers)}"
            )
        
        correct_count = 0
        for i, question in enumerate(questions):
            if user_answers[i] == question["correct_answer"]:
                correct_count += 1
        
        score_percentage = (correct_count / len(questions)) * 100
        passed = score_percentage >= 80
        
        # Get current user XP and level
        user_response = supabase.table("users").select("xp, pet_level").eq("id", user_id).execute()
        current_xp = user_response.data[0]["xp"]
        current_level = user_response.data[0]["pet_level"]
        
        # Award XP if passed
        xp_gained = 0
        new_xp = current_xp
        new_level = current_level
        level_up = False
        
        if passed:
            xp_gained = 50
            new_xp = current_xp + xp_gained
            new_level = (new_xp // 100) + 1
            level_up = new_level > current_level
            
            # Update user XP and level
            supabase.table("users").update({
                "xp": new_xp,
                "pet_level": new_level
            }).eq("id", user_id).execute()
        
        # Update or insert topic progress
        progress_data = {
            "user_id": user_id,
            "topic_id": topic_id,
            "status": "completed" if passed else "in_progress",
            "quiz_score": score_percentage,
            "quiz_completed": True,
            "completed_at": datetime.utcnow().isoformat() if passed else None,
            "updated_at": datetime.utcnow().isoformat()
        }
        
        # Upsert progress
        supabase.table("topic_progress").upsert(
            progress_data,
            on_conflict="user_id,topic_id"
        ).execute()
        
        # Find newly unlocked topics
        unlocked_topics = []
        
        if passed:
            # Get all topics that have this topic as a prerequisite
            all_topics_response = supabase.table("topics").select("id, prerequisites").execute()
            all_topics = all_topics_response.data if all_topics_response.data else []
            
            # Get all completed topics for this user
            completed_response = supabase.table("topic_progress")\
                .select("topic_id")\
                .eq("user_id", user_id)\
                .eq("quiz_completed", True)\
                .gte("quiz_score", 80)\
                .execute()
            
            completed_topic_ids = set([p["topic_id"] for p in completed_response.data]) if completed_response.data else set()
            
            # Check which topics are newly unlocked
            for topic in all_topics:
                topic_prereqs = topic.get("prerequisites", [])
                
                # If this topic has prerequisites and all are now completed
                if topic_prereqs and topic["id"] not in completed_topic_ids:
                    if all(prereq_id in completed_topic_ids for prereq_id in topic_prereqs):
                        unlocked_topics.append(topic["id"])
        
        # Return result with questions and correct answers
        return {
            "score": score_percentage,
            "correct_count": correct_count,
            "total_count": len(questions),
            "passed": passed,
            "xp_gained": xp_gained,
            "new_xp": new_xp,
            "new_level": new_level,
            "level_up": level_up,
            "questions": questions,
            "unlocked_topics": unlocked_topics
        }
    
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to submit quiz: {str(e)}")
