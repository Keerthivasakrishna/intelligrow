# IntelliGrow - AI-Powered Gamified Learning Platform 🚀

A gamified learning platform for Computer Science topics (DSA, CN, OS) with AI-powered personalized insights, interactive skill graphs, and pet companions that grow with you!

## ✨ Features

- 🎮 **Gamified Learning**: Earn XP, level up your pet, and unlock new topics
- 🧠 **AI-Powered Insights**: Google Gemini analyzes your quiz performance and provides personalized recommendations
- 📊 **Interactive Skill Graph**: Visual representation of learning paths with D3.js force-directed graphs
- 🐕 **Pet Companions**: Choose from 8 adorable pets that grow as you learn
- 📹 **Video Tutorials**: Embedded YouTube videos for each topic
- 📝 **Comprehensive Quizzes**: 10-question quizzes with detailed explanations
- 📈 **Progress Tracking**: Detailed analytics showing strengths, weaknesses, and focus areas

## 🛠️ Tech Stack

### Frontend
- **React** with Vite
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **D3.js** for interactive graphs
- **Lucide React** for icons

### Backend
- **FastAPI** (Python)
- **Supabase** for authentication and database
- **Google Gemini API** for AI-powered insights

## 📋 Prerequisites

- Node.js (v16 or higher)
- Python (v3.8 or higher)
- Google Gemini API Key
- Supabase Account

## 🚀 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/intelligrow.git
cd intelligrow
```

### 2. Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env.local` file in the `frontend` directory:

```env
# Copy from .env.example and fill in your values

# Google Gemini API Key (Get from: https://aistudio.google.com/app/apikey)
VITE_GEMINI_API_KEY=your_gemini_api_key_here

# Supabase Configuration (Get from: https://supabase.com/dashboard)
VITE_SUPABASE_URL=your_supabase_project_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

### 3. Backend Setup

```bash
cd backend
pip install -r requirements.txt
```

Create a `.env` file in the `backend` directory:

```env
SUPABASE_URL=your_supabase_project_url
SUPABASE_KEY=your_supabase_service_role_key
```

### 4. Get API Keys

#### Google Gemini API Key
1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Click "Create API Key"
3. Copy the key to your `.env.local` file

#### Supabase Keys
1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Create a new project
3. Go to Settings > API
4. Copy the URL and anon key to your `.env.local`
5. Copy the service role key to backend `.env`

### 5. Run the Application

**Terminal 1 - Backend:**
```bash
cd backend
python -m uvicorn main:app --reload
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

Visit `http://localhost:5173` in your browser!

## 🎯 How to Use

### Guest Mode (Quick Start)
1. Click "Continue as Guest"
2. Choose your pet companion
3. Explore subjects (DSA, CN, OS)
4. Take quizzes and earn XP
5. Check Results page for AI-powered insights

### With Authentication
1. Sign in with Google
2. All progress is saved to your account
3. Access from any device

## 🧠 AI Features

The AI analyzes your quiz performance and provides:
- **Strengths**: Topics where you excel
- **Weaknesses**: Areas needing improvement
- **Recommendations**: Actionable learning advice
- **Focus Areas**: Specific topics to prioritize
- **Overall Performance**: Motivational feedback

## 📁 Project Structure

```
intelligrow/
├── frontend/
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services (Gemini AI)
│   │   ├── store/          # State management
│   │   └── mockData.js     # Sample content & quizzes
│   └── .env.example        # Environment variables template
│
├── backend/
│   ├── main.py            # FastAPI application
│   ├── requirements.txt   # Python dependencies
│   └── .env.example       # Backend environment template
│
└── README.md
```

## 🔒 Security Notes

**IMPORTANT**: 
- Never commit `.env` or `.env.local` files to GitHub
- Keep your API keys private
- The `.gitignore` is configured to exclude these files
- Always use environment variables for sensitive data

## 🚀 Deployment

### Frontend (Vercel/Netlify)
1. Connect your GitHub repository
2. Add environment variables in the dashboard:
   - `VITE_GEMINI_API_KEY`
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
3. Deploy!

### Backend (Railway/Render)
1. Connect your GitHub repository
2. Add environment variables
3. Set build command: `pip install -r requirements.txt`
4. Set start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`

## 📝 Adding More Content

To add more topics:

1. Open `frontend/src/mockData.js`
2. Add to `mockTopicContent`:
```javascript
'5': {
  id: '5',
  title: 'Topic Name',
  description: 'Short description',
  difficulty: 'beginner',
  videoUrl: 'https://www.youtube.com/embed/VIDEO_ID',
  content: `# Topic Title
  
  ## Introduction
  Your content here...`
}
```

3. Add 10 quiz questions to `mockQuizQuestions`:
```javascript
'5': [
  { 
    id: '41', 
    question_text: 'Question?', 
    options: ['A', 'B', 'C', 'D'], 
    correct_answer: 0, 
    explanation: 'Because...' 
  },
  // ... 9 more questions
]
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Video tutorials from content creators on YouTube
- Supabase for backend infrastructure
- Google Gemini for AI capabilities
- All open-source libraries used in this project

## 📧 Contact

For questions or suggestions, please open an issue on GitHub.

---

Made with ❤️ for learners everywhere
