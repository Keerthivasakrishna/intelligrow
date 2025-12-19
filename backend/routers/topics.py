from fastapi import APIRouter, Depends, HTTPException, Path
from typing import Dict, Any, List
from auth import get_current_user
from database import supabase
from models import Topic, TopicNode, QuizQuestion

router = APIRouter(prefix="/api", tags=["topics"])


@router.get("/subjects/{subject_code}/graph", response_model=List[TopicNode])
async def get_subject_graph(
    subject_code: str = Path(..., description="Subject code (e.g., DSA)"),
    current_user: Dict[str, Any] = Depends(get_current_user)
):
    """
    Get the skill graph for a subject with unlock states based on user progress.
    Returns topics with their current status: locked, available, in_progress, or completed.
    """
    try:
        user_id = current_user["user_id"]
        
        # Get the subject
        subject_response = supabase.table("subjects").select("id").eq("code", subject_code).execute()
        if not subject_response.data or len(subject_response.data) == 0:
            raise HTTPException(status_code=404, detail="Subject not found")
        
        subject_id = subject_response.data[0]["id"]
        
        # Get all topics for this subject
        topics_response = supabase.table("topics")\
            .select("id, slug, title, description, difficulty, prerequisites, graph_position")\
            .eq("subject_id", subject_id)\
            .execute()
        
        if not topics_response.data:
            return []
        
        topics = topics_response.data
        
        # Get user's progress for all topics
        progress_response = supabase.table("topic_progress")\
            .select("topic_id, status, quiz_score, quiz_completed")\
            .eq("user_id", user_id)\
            .execute()
        
        # Create a map of topic_id -> progress
        progress_map = {}
        completed_topic_ids = set()
        
        if progress_response.data:
            for progress in progress_response.data:
                progress_map[progress["topic_id"]] = progress
                if progress["quiz_completed"] and progress["quiz_score"] >= 80:
                    completed_topic_ids.add(progress["topic_id"])
        
        # Build the topic nodes with unlock logic
        topic_nodes = []
        
        for topic in topics:
            topic_id = topic["id"]
            prerequisites = topic.get("prerequisites", [])
            
            # Determine status based on prerequisites and progress
            if topic_id in progress_map:
                progress = progress_map[topic_id]
                if progress["quiz_completed"] and progress["quiz_score"] >= 80:
                    status = "completed"
                else:
                    status = "in_progress"
                quiz_score = progress.get("quiz_score", 0)
            else:
                # Check if all prerequisites are completed
                if not prerequisites:
                    # No prerequisites, so it's available
                    status = "available"
                else:
                    # Check if all prerequisites are in completed_topic_ids
                    all_prereqs_completed = all(prereq_id in completed_topic_ids for prereq_id in prerequisites)
                    status = "available" if all_prereqs_completed else "locked"
                quiz_score = None
            
            topic_node = {
                "id": topic_id,
                "slug": topic["slug"],
                "title": topic["title"],
                "description": topic.get("description"),
                "difficulty": topic["difficulty"],
                "status": status,
                "prerequisites": prerequisites,
                "graph_position": topic["graph_position"],
                "quiz_score": quiz_score
            }
            
            topic_nodes.append(topic_node)
        
        return topic_nodes
    
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch subject graph: {str(e)}")


@router.get("/topics/{topic_id}", response_model=Topic)
async def get_topic_content(
    topic_id: str = Path(..., description="Topic ID"),
    current_user: Dict[str, Any] = Depends(get_current_user)
):
    """Get detailed content for a specific topic."""
    try:
        response = supabase.table("topics").select("*").eq("id", topic_id).execute()
        
        if not response.data or len(response.data) == 0:
            raise HTTPException(status_code=404, detail="Topic not found")
        
        return response.data[0]
    
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch topic: {str(e)}")


@router.get("/topics/{topic_id}/quiz", response_model=List[QuizQuestion])
async def get_topic_quiz(
    topic_id: str = Path(..., description="Topic ID"),
    current_user: Dict[str, Any] = Depends(get_current_user)
):
    """Get quiz questions for a topic (without correct answers)."""
    try:
        response = supabase.table("quiz_questions")\
            .select("id, topic_id, question_text, options, explanation")\
            .eq("topic_id", topic_id)\
            .execute()
        
        if not response.data or len(response.data) == 0:
            raise HTTPException(status_code=404, detail="No quiz questions found for this topic")
        
        return response.data
    
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch quiz: {str(e)}")
