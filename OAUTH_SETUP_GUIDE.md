# 🔐 Google OAuth Setup - Step-by-Step Guide

## Follow These Steps EXACTLY:

---

## PART 1: Get Supabase Redirect URL

### Step 1: In Supabase Dashboard
1. ✅ Go to your Supabase project
2. ✅ Click **Authentication** (left sidebar)
3. ✅ Click **Providers** tab
4. ✅ Scroll to find **Google**
5. ✅ **Copy the Callback URL** - looks like:
   ```
   https://[your-project-id].supabase.co/auth/v1/callback
   ```
6. ⚠️ **KEEP THIS PAGE OPEN** - you'll need to paste Google credentials here later

---

## PART 2: Create Google OAuth Credentials

### Step 2: In Google Cloud Console (https://console.cloud.google.com/)

#### 2.1 Create/Select Project
1. ✅ Click project dropdown (top left)
2. ✅ Click **"New Project"**
3. ✅ Name it: `IntelliGrow` (or any name)
4. ✅ Click **Create**
5. ✅ Wait for project to be created
6. ✅ **Select your new project** from the dropdown

#### 2.2 Enable Google+ API (Required!)
1. ✅ In search bar, type: `Google+ API`
2. ✅ Click **"Google+ API"** from results
3. ✅ Click **"Enable"** button
4. ✅ Wait for it to enable

#### 2.3 Configure OAuth Consent Screen
1. ✅ Go to **APIs & Services** → **OAuth consent screen** (left menu)
2. ✅ Select **External** user type
3. ✅ Click **Create**
4. ✅ Fill in required fields:
   - **App name**: `IntelliGrow`
   - **User support email**: Your email
   - **Developer contact email**: Your email
5. ✅ Click **Save and Continue**
6. ✅ **Scopes** page: Click **Save and Continue** (no changes needed)
7. ✅ **Test users** page: Click **Save and Continue** (no changes needed)
8. ✅ Review and click **Back to Dashboard**

#### 2.4 Create OAuth Client ID
1. ✅ Go to **APIs & Services** → **Credentials** (left menu)
2. ✅ Click **"+ Create Credentials"** (top)
3. ✅ Select **"OAuth 2.0 Client ID"**
4. ✅ Application type: **Web application**
5. ✅ Name: `IntelliGrow Web Client`
6. ✅ **Authorized JavaScript origins**: Add:
   ```
   http://localhost:5173
   ```
7. ✅ **Authorized redirect URIs**: Add **YOUR SUPABASE CALLBACK URL** from Step 1:
   ```
   https://[your-project-id].supabase.co/auth/v1/callback
   ```
8. ✅ Click **Create**
9. ✅ **COPY** the Client ID and Client Secret that appear

---

## PART 3: Configure Supabase with Google Credentials

### Step 3: Back to Supabase Dashboard

1. ✅ Go back to **Authentication** → **Providers** → **Google**
2. ✅ Toggle **"Enable Sign in with Google"** to ON
3. ✅ Paste your **Client ID** (from Google)
4. ✅ Paste your **Client Secret** (from Google)
5. ✅ Click **Save**

---

## PART 4: Test It!

### Step 4: Test Google Login

1. ✅ Go to http://localhost:5173
2. ✅ Click **"Sign in with Google"** button
3. ✅ Select your Google account
4. ✅ Allow permissions
5. ✅ Should redirect to IntelliGrow dashboard!

---

## 🎯 Checklist - Did You Do All These?

- [ ] Opened Supabase dashboard
- [ ] Copied Supabase callback URL
- [ ] Created Google Cloud project
- [ ] Enabled Google+ API
- [ ] Configured OAuth consent screen
- [ ] Created OAuth Client ID
- [ ] Added callback URL to Google
- [ ] Copied Client ID and Secret
- [ ] Pasted credentials into Supabase
- [ ] Enabled Google provider in Supabase
- [ ] Saved Supabase settings
- [ ] Tested login at localhost:5173

---

## ⚠️ Common Issues & Fixes

### Issue 1: "Error 400: redirect_uri_mismatch"
**Fix**: 
- Make sure the redirect URI in Google Console **EXACTLY** matches your Supabase callback URL
- Include the `/auth/v1/callback` part
- No trailing slash

### Issue 2: "This app isn't verified"
**Fix**:
- This is normal for testing
- Click "Advanced" → "Go to IntelliGrow (unsafe)"
- For production, you'd need to verify the app

### Issue 3: "Access blocked: IntelliGrow's request is invalid"
**Fix**:
- Make sure Google+ API is enabled
- Check OAuth consent screen is configured

### Issue 4: Google login doesn't redirect back
**Fix**:
- Check redirect URL in Supabase settings
- Make sure app is running on localhost:5173

---

## 📝 What You'll Need (Summary)

From Supabase:
- ✅ Callback URL (format: `https://abc123.supabase.co/auth/v1/callback`)

From Google:
- ✅ Client ID (format: `123456789-abc.apps.googleusercontent.com`)
- ✅ Client Secret (format: `GOCSPX-abcdef123456`)

---

## 🎉 After Setup

Once Google OAuth is working:

1. **Users can sign in with Google**
2. **Data persists across devices**
3. **Profile info auto-populated**
4. **Guest mode still works** (as backup)

---

## 💡 Pro Tips

- Keep Google Console and Supabase tabs open
- Copy credentials immediately (don't close the popup)
- Test with your own Google account first
- Guest mode is still available as fallback

---

## Need Help?

If you get stuck on any step, let me know which step number and I'll help debug!

Current status: 
✅ Both websites are open in your browser
✅ Code is ready (already configured)
⏳ Waiting for you to get credentials

Good luck! 🚀
