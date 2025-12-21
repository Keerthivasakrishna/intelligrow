-- =============================================
-- INTELLIGROW SUPABASE DATABASE SCHEMA
-- =============================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- 1. PROFILES TABLE (User Information)
-- =============================================
CREATE TABLE IF NOT EXISTS profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    avatar_url TEXT,
    xp INTEGER DEFAULT 0,
    pet_level INTEGER DEFAULT 1,
    selected_pet TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Policies for profiles
CREATE POLICY "Users can view own profile" 
    ON profiles FOR SELECT 
    USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" 
    ON profiles FOR UPDATE 
    USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" 
    ON profiles FOR INSERT 
    WITH CHECK (auth.uid() = id);

-- =============================================
-- 2. QUIZ_HISTORY TABLE (Store Quiz Results)
-- =============================================
CREATE TABLE IF NOT EXISTS quiz_history (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    subject_code TEXT NOT NULL,
    topic_id TEXT NOT NULL,
    score INTEGER NOT NULL,
    total_questions INTEGER NOT NULL,
    percentage DECIMAL(5,2) NOT NULL,
    time_spent_seconds INTEGER,
    completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE quiz_history ENABLE ROW LEVEL SECURITY;

-- Policies for quiz_history
CREATE POLICY "Users can view own quiz history" 
    ON quiz_history FOR SELECT 
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own quiz history" 
    ON quiz_history FOR INSERT 
    WITH CHECK (auth.uid() = user_id);

-- =============================================
-- 3. COURSES TABLE (Customizable by Admin)
-- =============================================
CREATE TABLE IF NOT EXISTS courses (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    code TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    total_topics INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Seed default courses
INSERT INTO courses (code, name, description, total_topics) VALUES
    ('DSA', 'Data Structures & Algorithms', 'Master fundamental data structures and algorithms', 12),
    ('CN', 'Computer Networks', 'Understanding networking  protocols and architecture', 10),
    ('OS', 'Operating Systems', 'Core concepts of operating systems', 10)
ON CONFLICT (code) DO NOTHING;

-- Allow all users to read courses
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view courses" 
    ON courses FOR SELECT 
    TO PUBLIC  
    USING (true);

-- =============================================
-- 4. USER_PROGRESS TABLE (Track Topic Completion)
-- =============================================
CREATE TABLE IF NOT EXISTS user_progress (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    topic_id TEXT NOT NULL,
    subject_code TEXT NOT NULL,
    status TEXT DEFAULT 'locked', -- locked, available, in_progress, completed
    best_score INTEGER DEFAULT 0,
    attempts INTEGER DEFAULT 0,
    last_attempted_at TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE,
    UNIQUE(user_id, topic_id)
);

-- Enable Row Level Security
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;

-- Policies for user_progress
CREATE POLICY "Users can view own progress" 
    ON user_progress FOR SELECT 
    USING (auth.uid() = user_id);

CREATE POLICY "Users can update own progress" 
    ON user_progress FOR ALL 
    USING (auth.uid() = user_id);

-- =============================================
-- 5. FUNCTIONS & TRIGGERS
-- =============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger for profiles table
CREATE TRIGGER update_profiles_updated_at 
    BEFORE UPDATE ON profiles 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Trigger for courses table
CREATE TRIGGER update_courses_updated_at 
    BEFORE UPDATE ON courses 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- =============================================
-- 6. ADMIN VIEW (For Admin Dashboard)
-- =============================================

-- View to get all user statistics
CREATE OR REPLACE VIEW user_stats AS
SELECT 
    p.id,
    p.email,
    p.full_name,
    p.xp,
    p.pet_level,
    p.selected_pet,
    p.created_at,
    COUNT(DISTINCT qh.subject_code) as subjects_enrolled,
    COUNT(qh.id) as total_quizzes,
    COALESCE(AVG(qh.percentage), 0) as avg_quiz_score,
    COALESCE(SUM(qh.time_spent_seconds), 0) as total_time_spent_seconds,
    MAX(qh.completed_at) as last_active
FROM profiles p
LEFT JOIN quiz_history qh ON p.id = qh.user_id
GROUP BY p.id, p.email, p.full_name, p.xp, p.pet_level, p.selected_pet, p.created_at;

-- =============================================
-- 7. INDEXES FOR PERFORMANCE
-- =============================================

CREATE INDEX IF NOT EXISTS idx_quiz_history_user_id ON quiz_history(user_id);
CREATE INDEX IF NOT EXISTS idx_quiz_history_subject ON quiz_history(subject_code);
CREATE INDEX IF NOT EXISTS idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_topic ON user_progress(topic_id);

-- =============================================
-- DONE! Database schema created successfully
-- =============================================

/*
NEXT STEPS:
1. Run this SQL in your Supabase SQL Editor
2. Get your Supabase URL and ANON KEY from project settings
3. Add to .env.local:
   VITE_SUPABASE_URL=your_url_here
   VITE_SUPABASE_ANON_KEY=your_key_here
4. Restart your dev server
*/
