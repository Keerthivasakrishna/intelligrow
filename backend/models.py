from pydantic import BaseModel
from typing import List, Optional, Dict, Any
from datetime import datetime


# User models
class User(BaseModel):
    id: str
    email: str
    full_name: Optional[str] = None
    avatar_url: Optional[str] = None
    xp: int = 0
    pet_level: int = 1
    created_at: Optional[datetime] = None


class UserStats(BaseModel):
    xp: int
    pet_level: int
    xp_to_next_level: int
    total_completed: int
    strengths: List[Dict[str, Any]]
    weaknesses: List[Dict[str, Any]]


# Subject models
class Subject(BaseModel):
    id: str
    code: str
    name: str
    description: Optional[str] = None
    total_topics: int


# Topic models
class Topic(BaseModel):
    id: str
    subject_id: str
    slug: str
    title: str
    description: Optional[str] = None
    content: str
    difficulty: str
    prerequisites: List[str]
    graph_position: Dict[str, float]


class TopicNode(BaseModel):
    id: str
    slug: str
    title: str
    description: Optional[str] = None
    difficulty: str
    status: str  # locked, available, in_progress, completed
    prerequisites: List[str]
    graph_position: Dict[str, float]
    quiz_score: Optional[float] = None


# Quiz models
class QuizQuestion(BaseModel):
    id: str
    topic_id: str
    question_text: str
    options: List[str]
    explanation: str
    # Don't expose correct_answer to frontend initially


class QuizQuestionWithAnswer(QuizQuestion):
    correct_answer: int


class QuizSubmission(BaseModel):
    topic_id: str
    answers: List[int]  # List of selected option indices


class QuizResult(BaseModel):
    score: float  # Percentage
    correct_count: int
    total_count: int
    passed: bool  # True if >= 80%
    xp_gained: int
    new_xp: int
    new_level: int
    level_up: bool
    questions: List[QuizQuestionWithAnswer]
    unlocked_topics: List[str]  # IDs of newly unlocked topics


# Progress models
class TopicProgress(BaseModel):
    id: str
    user_id: str
    topic_id: str
    status: str
    quiz_score: float
    quiz_completed: bool
    completed_at: Optional[datetime] = None
