# 🚀 SUPABASE SETUP GUIDE - IntelliGrow

## ⚠️ IMPORTANT: You MUST Set Up Supabase for the App to Work!

Without Supabase, students cannot sign up and admin won't see real users.

---

## 📋 **Step 1: Create Supabase Project (5 minutes)**

### 1. Go to [https://supabase.com](https://supabase.com)
### 2. Click "Start your project"
### 3. Sign in with GitHub (or create account)
### 4. Click "+ New Project"
### 5. Fill in:
   - **Project Name:** IntelliGrow
   - **Database Password:** (create a strong password - save it!)
   - **Region:** Choose closest to you
   - **Plan:** Free (0$/month)
### 6. Click "Create new project"
### 7. Wait 2-3 minutes for setup...

---

## 📋 **Step 2: Run Database Schema (2 minutes)**

### 1. In your Supabase project, click **"SQL Editor"** (left sidebar)
### 2. Click **"+ New Query"**
### 3. Copy ALL content from `database/supabase_schema.sql`
### 4. Paste into the SQL editor
### 5. Click **"Run"** (or press Ctrl+Enter)
### 6. You should see: ✅ **"Success. No rows returned"**

This creates:
- `profiles` table (user information)
- `quiz_history` table (quiz results)
- `courses` table (customizable courses)
- `user_progress` table (topic completion)

---

## 📋 **Step 3: Get API Credentials (1 minute)**

### 1. In Supabase, click ⚙️ **"Project Settings"** (bottom left)
### 2. Click **"API"** in the sidebar
### 3. Find these two values:

```
Project URL: https://xxxxxxxxxxxxx.supabase.co
anon public key: eyJhbGciOiJIUzI1NiIsInR5c.....
```

### 4. Copy both values

---

## 📋 **Step 4: Add to .env.local (1 minute)**

### 1. Open `frontend/.env.local` in your project
### 2. Add these lines:

```env
# Existing
VITE_GEMINI_API_KEY=AIzaSyDHkW8vb3q9_XqZ5KfGjN2EwP7mR4tQcTs

# NEW - Add these:
VITE_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5c.....
```

### 3. Replace with YOUR actual values from Step 3
### 4. Save the file

---

## 📋 **Step 5: Restart Dev Server (Required!)**

### Close the terminal running `npm run dev`
### Then run again:

```bash
cd frontend
npm run dev
```

---

## ✅ **Step 6: Test It Works!**

### 1. Open http://localhost:5174/
### 2. Click **"Sign Up"**
### 3. Enter:
   - Name: Test User
   - Email: test@example.com
   - Password: test123
### 4. Click **"Sign Up"**
### 5. You should see: "Account created!"
### 6. You'll be redirected to pet selection

### 7. Now login as **Admin:**
   - Email: admin@intelligrow.com
   - Password: admin@intelligrow2024
### 8. Go to **Admin Dashboard**
### 9. You should see **1 student** (Test User)!

---

## 🎯 **What Supabase Gives You:**

### ✅ **Real Database Storage**
- Users stored permanently
- Quiz results saved
- Progress tracked
- Works across devices

### ✅ **Authentication**
- Secure password hashing
- Email verification (optional)
- Session management
- OAuth ready (Google, GitHub, etc.)

### ✅ **Scalability**
- Handle 10-20 users easily
- Free tier: 50,000 monthly active users
- Automatic backups
- Real-time capabilities

### ✅ **Admin Dashboard**
- See ALL registered users
- Real quiz scores
- Actual study time
- Growth metrics

---

## 🔍 **Verify Database Tables**

In Supabase:
1. Click **"Table Editor"** (left sidebar)
2. You should see:
   - ✅ profiles
   - ✅ quiz_history
   - ✅ courses
   - ✅ user_progress

---

## 🐛 **Troubleshooting**

### **Problem: "Failed to load users"**
**Solution:** Check that:
1. `.env.local` has correct VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY
2. You restarted the dev server after adding env vars
3. SQL schema was run successfully

### **Problem: "Sign up not working"**
**Solution:**
1. Check browser console for errors (F12)
2. Verify SQL schema created `profiles` table
3. Check Supabase project is active (not paused)

### **Problem: "Admin dashboard shows 0 students"**
**Solution:**
1. Sign up at least 1 test user first
2. Click "Refresh Data" button in admin dashboard
3. Check browser console for errors

---

## 📊 **Expected Flow:**

### **Student Journey:**
```
1. Sign Up (any email) 
   → Stored in Supabase profiles table
   
2. Select Pet
   → Profile updated with pet choice
   
3. Take Quizzes
   → Results stored in quiz_history table
   
4. View Analytics
   → Data pulled from database
```

### **Admin Journey:**
```
1. Login as admin
   
2. View Dashboard
   → Fetch all users from profiles table
   → Calculate real-time stats
   
3. See Growth
   → New sign-ups appear automatically
   → Real quiz scores
   → Actual usage data
```

---

## 💡 **What Changes:**

### **Before Supabase (localStorage):**
- ❌ Only pre-loaded 4 users
- ❌ Data lost on browser clear
- ❌ No cross-device sync
- ❌ Admin sees fake CSV data

### **After Supabase (Real DB):**
- ✅ Unlimited users can sign up
- ✅ Data persists forever
- ✅ Works across devices
- ✅ Admin sees REAL users
- ✅ Production-ready

---

## 🎉 **You're Done!**

Once you complete the steps above:

1. **Students** can sign up and their data is saved
2. **Admin** sees all real registered users
3. **Quiz history** is permanently stored
4. **Progress** syncs across sessions
5. **System** is production-ready!

---

## 📝 **Quick Commands:**

```bash
# If you need to check env vars are loaded:
npm run dev

# Check in browser console:
console.log(import.meta.env.VITE_SUPABASE_URL)
# Should NOT be 'undefined'
```

---

## 🆘 **Need Help?**

1. Check Supabase project is active (not paused after 7 days inactivity)
2. Verify API credentials are correct
3. Make sure SQL schema ran without errors
4. Restart dev server after any env changes

---

**⚠️ WITHOUT SUPABASE, THE APP WILL ONLY WORK FOR GUEST AND ADMIN!**

**Set it up now - it takes less than 10 minutes!** 🚀
