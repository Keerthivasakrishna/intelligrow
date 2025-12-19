# 🚀 IntelliGrow - AI-Powered Learning Platform

> Transform your Computer Science learning journey with AI-driven insights, gamification, and personalized study plans.

[![Live Demo](https://img.shields.io/badge/demo-live-green)](https://intelligrow.vercel.app)
[![GitHub](https://img.shields.io/badge/github-repo-blue)](https://github.com/Keerthivasakrishna/intelligrow)

---

## ✨ Features

### 🎯 **Core Features**
- **AI-Powered Analytics** - Deep learning insights using Google Gemini AI
- **Interactive Skill Graphs** - Visual representation of topic mastery
- **Gamified Learning** - Pet companions that grow with your progress
- **Personalized Study Plans** - 4-week comprehensive learning roadmaps
- **Email/Password Authentication** - Secure user accounts with localStorage

### 📚 **Subjects Covered**
- **DSA** - Data Structures & Algorithms (12 topics)
- **Computer Networks** - CN (10 topics)
- **Operating Systems** - OS (10 topics)

### 🧠 **AI Analysis Includes**
- Cognitive assessment & learning velocity
- Detailed strengths & weaknesses analysis
- Root-cause identification
- Memory retention strategies
- Spaced repetition recommendations
- Motivational insights

---

## 🎮 Demo Accounts

Try the platform with these pre-loaded accounts:

| Email | Password |
|-------|----------|
| `keerthi@gmail.com` | `kvk@123` |
| `sibhi@gmail.com` | `sibhi@123` |
| `swarna@gmail.com` | `swarna@123` |
| `neya@gmail.com` | `neya@123` |

**Or use Guest Mode** for instant access!

---

## 🚀 Quick Start

### **Prerequisites**
- Node.js 18+ 
- npm or yarn

### **Installation**

```bash
# Clone the repository
git clone https://github.com/Keerthivasakrishna/intelligrow.git
cd intelligrow

# Install frontend dependencies
cd frontend
npm install

# Create environment file (optional - for AI features)
# Create .env.local in frontend folder with:
# VITE_GEMINI_API_KEY=your_gemini_api_key

# Run development server
npm run dev
```

**Open** http://localhost:5173

---

## 🏗️ Project Structure

```
intelligrow/
├── frontend/              # React + Vite application
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── pages/        # Page components
│   │   ├── services/     # AI & API services
│   │   ├── store/        # Zustand state management
│   │   └── mockData.js   # Sample quiz data
│   ├── public/           # Static assets
│   └── package.json
├── backend/              # Python FastAPI (optional)
└── README.md
```

---

## 💡 How It Works

### 1. **Sign In**
- Use email/password or guest mode
- Select your learning companion pet

### 2. **Choose Subject**
- Pick from DSA, CN, or OS
- View interactive skill graph

### 3. **Take Quizzes**
- Answer topic-specific questions
- Track your progress in real-time

### 4. **Get AI Insights**
- Detailed analysis of your performance
- Personalized study recommendations
- 4-week learning roadmap

---

## 🛠️ Tech Stack

### **Frontend**
- **React** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Router** - Navigation
- **Zustand** - State management

### **AI & Services**
- **Google Gemini API** - AI-powered analysis
- **localStorage** - Data persistence

### **Optional Backend**
- **FastAPI** - Python backend (ready for future features)
- **Supabase** - Database (configured but not required)

---

## 🎨 Screenshots

### Dashboard
![Dashboard](https://via.placeholder.com/800x400?text=Dashboard+Screenshot)

### AI Analysis
![AI Analysis](https://via.placeholder.com/800x400?text=AI+Analysis+Screenshot)

### Skill Graph
![Skill Graph](https://via.placeholder.com/800x400?text=Skill+Graph+Screenshot)

---

## 🔑 Environment Variables

For full AI functionality, add to `frontend/.env.local`:

```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

**Get your free API key:** https://ai.google.dev/

---

## 📱 Features in Detail

### **Authentication**
- Email/password sign up & sign in
- Guest mode for instant access
- Pre-loaded demo accounts
- Secure localStorage storage

### **Gamification**
- Choose from 8 pet companions
- Pets level up with your progress
- XP system for quiz completion
- Visual progress tracking

### **AI Analysis**
- **Cognitive Assessment** - Learning velocity & mental models
- **Strength Analysis** - What you're excelling at
- **Weakness Identification** - Root causes & impact
- **Conceptual Gaps** - What's missing in your understanding
- **Study Plans** - Immediate actions & 4-week roadmap
- **Memory Strategies** - Mnemonics & retention techniques

---

## 🚢 Deployment

### **Vercel (Recommended)**

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd frontend
vercel
```

**Settings:**
- Root Directory: `frontend`
- Build Command: `npm run build`
- Output Directory: `dist`

**Environment Variables:**
- Add `VITE_GEMINI_API_KEY` in Vercel dashboard

### **Netlify**

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
cd frontend
netlify deploy
```

---

## 📋 To-Do / Future Enhancements

- [ ] Backend integration for persistent data
- [ ] Social features (leaderboards, challenges)
- [ ] More subjects (DBMS, ML, etc.)
- [ ] Mobile app
- [ ] Study streak tracking
- [ ] Collaborative learning rooms

---

## 🤝 Contributing

Contributions welcome! Please:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👨‍💻 Author

**Keerthivasa Krishna**
- GitHub: [@Keerthivasakrishna](https://github.com/Keerthivasakrishna)

---

## 🙏 Acknowledgments

- Google Gemini AI for powerful analysis
- Supabase for backend infrastructure
- Lucide React for beautiful icons
- Framer Motion for smooth animations

---

## 📞 Support

For questions or issues:
- Open an [Issue](https://github.com/Keerthivasakrishna/intelligrow/issues)
- Email: [your-email@example.com]

---

<div align="center">

**⭐ Star this repo if you find it helpful!**

Made with ❤️ for students, by students

</div>
