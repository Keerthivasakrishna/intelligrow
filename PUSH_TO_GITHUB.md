# 🚀 Push IntelliGrow to GitHub - Step by Step

## ⚠️ DO NOT Drag and Drop Files!

GitHub has file limits. Use Git command line instead.

---

## ✅ **Step-by-Step Guide:**

### **Step 1: Create GitHub Repository**

1. Go to https://github.com
2. Click **"New"** (green button)
3. Repository name: `intelligrow` (or any name)
4. **DO NOT** initialize with README
5. Make it **Public** (so judges can see)
6. Click **"Create repository"**

**STOP - Don't close this page! You'll need the URL.**

---

### **Step 2: Open Terminal in Project Folder**

1. Open **PowerShell** or **Command Prompt**
2. Navigate to project:
   ```
   cd E:\Hackathon\project
   ```

---

### **Step 3: Initialize Git (if not already)**

Run these commands **ONE BY ONE**:

```bash
# Check if git is initialized
git status
```

**If you see "not a git repository"**, run:
```bash
git init
```

---

### **Step 4: Add All Files**

```bash
# Add all files (will automatically skip node_modules because of .gitignore)
git add .
```

**You should see:**
- ✅ Adding frontend files
- ✅ Adding backend files  
- ✅ Adding markdown files
- ❌ **NOT** adding node_modules (automatically skipped)

---

### **Step 5: Commit Files**

```bash
git commit -m "Initial commit - IntelliGrow AI Learning Platform"
```

---

### **Step 6: Add Remote Repository**

**Replace `YOUR_USERNAME` and `YOUR_REPO_NAME`:**

```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
```

**Example:**
```bash
git remote add origin https://github.com/keerthi/intelligrow.git
```

---

### **Step 7: Push to GitHub**

```bash
# Set main branch
git branch -M main

# Push to GitHub
git push -u origin main
```

**You'll be asked for:**
- Username: Your GitHub username
- Password: Use **Personal Access Token** (not your GitHub password)

---

### **Step 8: Get Personal Access Token (if needed)**

If push fails asking for password:

1. Go to https://github.com/settings/tokens
2. Click **"Generate new token (classic)"**
3. Select scopes: `repo` (check the box)
4. Click **"Generate token"**
5. **COPY THE TOKEN** (you won't see it again!)
6. Use this as password when pushing

---

## ✅ **Quick Command List:**

```bash
cd E:\Hackathon\project
git init
git add .
git commit -m "Initial commit - IntelliGrow platform"
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
git branch -M main
git push -u origin main
```

---

## 🐛 **Common Issues:**

### **Issue 1: "File size too large"**

**Solution:**
- This shouldn't happen if .gitignore is correct
- If it does: `git rm -r --cached node_modules`

### **Issue 2: "Permission denied"**

**Solution:**
- Use Personal Access Token instead of password
- Follow Step 8 above

### **Issue 3: "node_modules being added"**

**Solution:**
```bash
git rm -r --cached node_modules
git commit -m "Remove node_modules"
git push
```

### **Issue 4: "Hidden files"**

**Solution:**
- This is normal! `.git`, `.gitignore` are hidden but needed
- They will be uploaded automatically

---

## 📋 **What Gets Uploaded:**

✅ **Yes:**
- All .jsx, .js, .py files
- README.md
- package.json
- requirements.txt
- .gitignore (hidden but important)

❌ **No (automatically skipped):**
- node_modules/
- .venv/
- .env.local
- dist/

---

## ✅ **Verify Upload:**

After pushing:
1. Go to your GitHub repo URL
2. You should see:
   - `frontend/` folder
   - `backend/` folder
   - `README.md`
   - `.gitignore`
   - Other files

3. Check file count: Should be ~50-100 files, not thousands!

---

## 🎯 **Next Steps After Push:**

1. ✅ Repository is public (judges can see)
2. ✅ Add GitHub URL to your submission
3. ✅ Deploy frontend to Vercel (optional)
4. ✅ Share demo credentials in README

---

## 💡 **Pro Tips:**

- **Don't use GitHub website upload** - use command line
- **node_modules is HUGE** - that's why we ignore it
- **Anyone who clones will run** `npm install` to get node_modules
- **Hidden files are OK** - they're configuration files

---

## 🆘 **Still Having Issues?**

Tell me the exact error message and I'll help!

Common errors:
1. "Support for password authentication was removed"
   → Use Personal Access Token

2. "Large files detected"
   → Check .gitignore is working

3. "Permission denied"
   → Check token has repo access
