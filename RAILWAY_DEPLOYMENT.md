# Deploy to Railway.app (Alternative to Vercel)

Railway is even simpler than Vercel - no environment variable bugs!

---

## 🚂 Why Railway?

- ✅ Simpler deployment
- ✅ Includes PostgreSQL database
- ✅ No environment variable issues
- ✅ One platform for both app and database
- ✅ Free $5 credit (enough for testing)

---

## 📋 Deployment Steps

### Step 1: Sign Up for Railway

1. Go to https://railway.app
2. Click **"Login"**
3. Click **"Login with GitHub"**
4. Authorize Railway

### Step 2: Create New Project

1. Click **"New Project"**
2. Select **"Deploy from GitHub repo"**
3. Find and select **"college_discovery"** repository
4. Click on it

### Step 3: Add PostgreSQL Database

1. In your project, click **"+ New"**
2. Select **"Database"**
3. Select **"Add PostgreSQL"**
4. Wait for database to be created (30 seconds)

### Step 4: Connect Database to App

1. Click on your **PostgreSQL** service
2. Go to **"Variables"** tab
3. Copy the **"DATABASE_URL"** value
4. Click on your **app service** (college_discovery)
5. Go to **"Variables"** tab
6. Click **"+ New Variable"**
7. Add these variables:

**Variable 1:**
- Name: `DATABASE_URL`
- Value: (paste the PostgreSQL DATABASE_URL you copied)

**Variable 2:**
- Name: `AUTH_SECRET`
- Value: `8k9mP2vQwX7nR5tL4j6bF3hGdsAicD9`

**Variable 3:**
- Name: `NODE_ENV`
- Value: `production`

8. Click **"Deploy"** or it will auto-deploy

### Step 5: Wait for Deployment

- Railway will build your app (2-3 minutes)
- You'll see build logs in real-time
- When done, you'll see **"Success"**

### Step 6: Get Your URL

1. Click on your app service
2. Go to **"Settings"** tab
3. Scroll to **"Domains"**
4. Click **"Generate Domain"**
5. You'll get a URL like: `https://college-discovery-production.up.railway.app`

### Step 7: Initialize Database

In your terminal:

```bash
# Use the Railway DATABASE_URL (copy from Railway dashboard)
set DATABASE_URL=your-railway-database-url

# Push schema
npx prisma db push

# Seed database
npx prisma db seed
```

### Step 8: Visit Your Site!

Click on your Railway domain and test your app!

---

## 💰 Cost

- **First $5**: FREE (credit given on signup)
- **After $5**: ~$5-10/month for hobby projects
- **Includes**: App hosting + PostgreSQL database

---

## ✅ Advantages Over Vercel + Render

- ✅ Everything in one platform
- ✅ No environment variable secret bugs
- ✅ Simpler setup
- ✅ Database included
- ✅ Automatic HTTPS
- ✅ Better for full-stack apps

---

## 🔄 Alternative: Still Use Vercel? Try This

If you still want Vercel, try this **nuclear option**:

### Option A: Deploy Without Env Vars First

1. Delete Vercel project
2. Import repo again
3. **Skip all environment variables**
4. Click Deploy immediately
5. After successful deployment:
   - Go to Settings → Environment Variables
   - Add DATABASE_URL there
   - Redeploy

### Option B: Use .env File (Not Recommended for Production)

1. Create `.env.production` in your project
2. Add all environment variables there
3. Commit to GitHub (normally you shouldn't, but as a workaround)
4. Deploy to Vercel without adding env vars
5. After deployment works, remove from GitHub and add properly

---

## 🎯 Recommended: Railway

Railway is actually better suited for this full-stack app since it includes both hosting and database in one platform.

**Try Railway!** It will work on first try! 🚂
