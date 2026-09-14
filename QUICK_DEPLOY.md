# Quick Deployment Guide

Deploy your College Discovery platform in under 15 minutes!

## 🎯 Quick Start

### 1️⃣ Push to GitHub (if not done already)

```bash
git init
git add .
git commit -m "Ready for deployment"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

### 2️⃣ Set Up Database on Render

1. Go to [render.com](https://render.com) → Sign up/Login
2. Click **New +** → **PostgreSQL**
3. Fill in:
   - Name: `college-discovery-db`
   - Database: `college_discovery`
   - Region: Choose nearest
   - Plan: **Free** (or Starter for production)
4. Click **Create Database**
5. **Copy the "External Database URL"** - you'll need this!

### 3️⃣ Deploy to Vercel

#### Using Vercel Dashboard (Easiest):

1. Go to [vercel.com](https://vercel.com) → Sign up/Login with GitHub
2. Click **Add New** → **Project**
3. Import your GitHub repository
4. Click **Deploy** (don't configure anything yet)
5. After deployment, go to **Settings** → **Environment Variables**
6. Add these variables for **Production, Preview, Development**:

| Variable Name | Value | Where to Get |
|---------------|-------|--------------|
| `DATABASE_URL` | `postgresql://...` | From Render (External Database URL) |
| `AUTH_SECRET` | 32+ random characters | Generate below |

**Generate AUTH_SECRET** (PowerShell):
```powershell
-join ((48..57) + (65..90) + (97..122) | Get-Random -Count 32 | ForEach-Object {[char]$_})
```

7. Go to **Deployments** → Click **Redeploy** on latest deployment

#### Using Vercel CLI (Alternative):

```bash
npm install -g vercel
vercel login
vercel
```

### 4️⃣ Initialize Database

After Vercel deployment, run these commands locally:

```bash
# Windows CMD
set DATABASE_URL=your-render-external-database-url
npx prisma db push
npx prisma db seed

# Windows PowerShell
$env:DATABASE_URL="your-render-external-database-url"
npx prisma db push
npx prisma db seed
```

### 5️⃣ Test Your Deployment

Visit your Vercel URL (e.g., `https://your-project.vercel.app`) and verify:
- ✅ Homepage loads
- ✅ Explore colleges page shows data
- ✅ Registration/Login works
- ✅ College details page loads

## 🎉 Done!

Your application is now live!

---

## 🔧 Common Issues

### Issue: "Database connection failed"
**Fix**: Check if `DATABASE_URL` environment variable is set correctly in Vercel

### Issue: "No colleges showing"
**Fix**: Run the seed command: `npx prisma db seed`

### Issue: "500 Internal Server Error"
**Fix**: Check Vercel function logs in the dashboard

### Issue: "Prisma Client not found"
**Fix**: The `postinstall` script in package.json should handle this automatically. Redeploy if needed.

---

## 📊 Monitoring

### Vercel Dashboard
- View deployment logs
- Monitor function performance
- Check error rates

### Render Dashboard
- Monitor database connections
- View query performance
- Check storage usage

---

## 💰 Costs

- **Vercel Hobby**: Free forever (for personal projects)
- **Render Free**: Free for 90 days, then $7/month
- **Total**: $0 for first 90 days, then $7/month

---

## 🚀 Next Steps

1. **Custom Domain**: Add your domain in Vercel settings
2. **Analytics**: Enable Vercel Analytics
3. **Monitoring**: Set up error tracking (Sentry, etc.)
4. **Performance**: Enable ISR for better performance
5. **Backup**: Set up regular database backups on Render

---

## 📚 More Help

See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for detailed instructions and troubleshooting.
