# IntelliGrow Platform - Quick Start Guide

## ⚡ Steps to Get Started

### 1. Load Database Schema (REQUIRED FIRST STEP)

**Open your Supabase SQL Editor:**
1. Go to https://supabase.com/dashboard/project/hykrbletruplvuhsioya
2. Click on **SQL Editor** in the left sidebar
3. Click **New Query**

**Run these SQL scripts IN ORDER:**

#### Script 1: Create Tables (migrations.sql)
Copy and paste the entire content of `database/migrations.sql` and run it.
This creates:
- users table
- subjects table
- topics table
- quiz_questions table
- topic_progress table
- RLS policies

#### Script 2: Seed DSA Topics (seed_topics.sql)
Copy and paste the entire content of `database/seed_topics.sql` and run it.
This adds:
- DSA subject
- 12 topics (Arrays, Linked Lists, Recursion, Stacks, Queues, Binary Trees, BST, Graphs, Sorting, Searching, Hashing, Dynamic Programming)
- Prerequisite relationships
- Learning content for each topic

#### Script 3: Add Quiz Questions (seed_quiz.sql)
Copy and paste the entire content of `database/seed_quiz.sql` and run it.
This adds:
- 5 questions per topic (60 questions total)
- Multiple choice options
- Correct answers
- Explanations

### 2. Start Backend Server

Open Terminal 1:
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

Backend runs at: **http://localhost:8000**
API docs at: **http://localhost:8000/docs**

### 3. Start Frontend Server

Open Terminal 2:
```bash
cd frontend
npm run dev
```

Frontend runs at: **http://localhost:5173**

### 4. Configure Google OAuth (If Not Done)

1. Go to Supabase Dashboard → Authentication → Providers
2. Enable **Google**
3. Add redirect URLs:
   - `http://localhost:5173`
   - `http://localhost:5173/dashboard`

### 5. Test the Application

1. Visit **http://localhost:5173**
2. Click "Sign in with Google"
3. After login, you'll see the Dashboard
4. Click on "Data Structures & Algorithms"
5. You'll see the skill graph with colored nodes:
   - **Blue**: Available to learn (no prerequisites)
   - **Grey**: Locked (prerequisites not completed)
6. Click on "Arrays" (should be blue/available)
7. Read the content and click "Start Quiz"
8. Answer 5 questions (try to get 4+ correct for 80%)
9. Submit and see:
   - ✅ Score and pass/fail status
   - ✅ XP gained (+50 if passed)
   - ✅ Pet level up (if you reached 100 XP)
   - ✅ Newly unlocked topics notification
10. Click "Continue Learning" to return to the graph
11. Notice:
    - "Arrays" is now **green** (completed)
    - "Stacks" and "Queues" are now **blue** (unlocked because Arrays is complete)

## 🎯 Key Features to Test

### Self-Healing User Sync
The first time you complete a quiz, the backend automatically creates your user record in the database. No manual setup needed!

### Prerequisite Unlocking
Topics unlock when ALL their prerequisites are completed with 80%+ score:
- Arrays → Stacks, Queues, Sorting, Hashing
- Recursion → Binary Trees, Dynamic Programming
- Binary Trees → BST, Graphs
- Sorting → Searching

### XP & Pet Leveling
- Earn **50 XP** per passed quiz
- Pet levels up every **100 XP**
- Watch the pet emoji evolve as you level up!

### Analytics
After completing multiple quizzes with different scores, check the sidebar:
- **Strengths**: Your top 3 best-scoring topics
- **Weaknesses**: Your 3 lowest-scoring topics (to review)

## 🐛 Troubleshooting

**"Authentication failed"**: Make sure Google OAuth is enabled in Supabase

**"Failed to fetch subjects"**: Ensure backend is running at http://localhost:8000

**"Quiz questions not found"**: Run the seed_quiz.sql script in Supabase

**Topics not unlocking**: Make sure you scored 80%+ on prerequisite topics

## 📊 Database Verification

To verify the database setup, run this query in Supabase SQL Editor:

```sql
-- Check if topics were loaded
SELECT COUNT(*) as topic_count FROM topics;
-- Should return: 12

-- Check if quiz questions were loaded  
SELECT COUNT(*) as question_count FROM quiz_questions;
-- Should return: 60 (5 per topic)

-- Check subjects
SELECT * FROM subjects;
-- Should show DSA subject
```

## 🎨 UI Features

- **Glassmorphism Design**: Translucent cards with backdrop blur
- **Smooth Animations**: Framer Motion for page transitions
- **Responsive Layout**: Works on desktop and tablets
- **Dark Mode**: Modern purple/blue gradient background
- **Interactive Nodes**: Hover effects and status indicators

Enjoy your gamified learning experience! 🚀
