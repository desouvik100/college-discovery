# Deployment Guide: College Discovery Platform

This guide will walk you through deploying the College Discovery application to Vercel (frontend) and Render (database).

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Database Setup on Render](#database-setup-on-render)
3. [Deploy to Vercel](#deploy-to-vercel)
4. [Post-Deployment Steps](#post-deployment-steps)
5. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before you begin, ensure you have:
- A GitHub account (to connect with Vercel)
- A Vercel account (sign up at https://vercel.com)
- A Render account (sign up at https://render.com)
- Your project code pushed to a GitHub repository

### Push Your Code to GitHub

If you haven't already, push your code to GitHub:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

---

## Database Setup on Render

### Step 1: Create PostgreSQL Database

1. Go to https://render.com and log in
2. Click **"New +"** → **"PostgreSQL"**
3. Configure your database:
   - **Name**: `college-discovery-db` (or your preferred name)
   - **Database**: `college_discovery`
   - **User**: `college_user` (auto-generated)
   - **Region**: Choose closest to your users
   - **PostgreSQL Version**: 16 (or latest)
   - **Plan**: Free (or paid for production)

4. Click **"Create Database"**

### Step 2: Get Database Connection Details

After creation, you'll see:
- **Internal Database URL**: For connecting from Render services
- **External Database URL**: For external connections (use this for Vercel)

The External URL format:
```
postgresql://user:password@hostname:port/database
```

**Copy the External Database URL** - you'll need it for Vercel.

### Step 3: Initialize Database Schema (from your local machine)

1. Temporarily set the DATABASE_URL to your Render database:

```bash
# Windows CMD
set DATABASE_URL=postgresql://user:password@hostname:port/database
npx prisma db push
npx prisma db seed

# Windows PowerShell
$env:DATABASE_URL="postgresql://user:password@hostname:port/database"
npx prisma db push
npx prisma db seed
```

2. Or you can update the DATABASE_URL after Vercel deployment and run migrations from there.

---

## Deploy to Vercel

### Step 1: Connect GitHub Repository

1. Go to https://vercel.com and log in
2. Click **"Add New..."** → **"Project"**
3. Import your GitHub repository
4. Vercel will auto-detect Next.js

### Step 2: Configure Build Settings

Vercel should auto-detect these settings:
- **Framework Preset**: Next.js
- **Root Directory**: `./`
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

### Step 3: Add Environment Variables

Click on **"Environment Variables"** and add:

| Name | Value | Environment |
|------|-------|-------------|
| `DATABASE_URL` | `postgresql://user:password@hostname:port/database` (from Render) | Production, Preview, Development |
| `AUTH_SECRET` | Generate a secure random string (min 32 chars) | Production, Preview, Development |
| `NODE_ENV` | `production` | Production |

**Generate AUTH_SECRET** (run locally):
```bash
# Windows PowerShell
-join ((48..57) + (65..90) + (97..122) | Get-Random -Count 32 | ForEach-Object {[char]$_})

# Or use online generator: https://generate-secret.vercel.app/32
```

### Step 4: Deploy

1. Click **"Deploy"**
2. Wait for the build to complete (2-5 minutes)
3. Once done, you'll get a production URL like: `https://your-project.vercel.app`

### Step 5: Run Database Migrations

After first deployment, you need to initialize the database:

1. Go to your Vercel project dashboard
2. Click **"Settings"** → **"Functions"**
3. Or use Vercel CLI locally:

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Link to your project
vercel link

# Run commands in production environment
vercel env pull .env.production
DATABASE_URL="your-render-database-url" npx prisma db push
DATABASE_URL="your-render-database-url" npx prisma db seed
```

Alternatively, create a deployment script (see below).

---

## Post-Deployment Steps

### 1. Set Up Custom Domain (Optional)

1. In Vercel dashboard, go to **"Settings"** → **"Domains"**
2. Add your custom domain
3. Configure DNS records as instructed

### 2. Enable Prisma Data Proxy (Optional for Serverless)

For better serverless performance:
1. Consider using Prisma Data Proxy or Prisma Accelerate
2. Update `DATABASE_URL` to use connection pooling

### 3. Test Your Deployment

Visit your Vercel URL and test:
- ✅ Homepage loads
- ✅ Explore colleges page works
- ✅ College details page loads
- ✅ Registration/Login works
- ✅ Search and filters work

### 4. Monitor Performance

- Check Vercel Analytics dashboard
- Monitor database connections on Render
- Set up error tracking (Sentry, LogRocket, etc.)

---

## Automated Database Seeding (Optional)

Create a seed script that runs after deployment:

### Option 1: Vercel Build Script

Add to `package.json`:

```json
{
  "scripts": {
    "build": "prisma generate && prisma db push && next build",
    "vercel-build": "prisma generate && next build"
  }
}
```

### Option 2: Create API Route for Seeding

Create `app/api/seed/route.ts`:

```typescript
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

export async function POST(request: Request) {
  const authHeader = request.headers.get('authorization');
  
  if (authHeader !== `Bearer ${process.env.SEED_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const prisma = new PrismaClient();
  
  try {
    // Your seed logic here
    // Copy from prisma/seed.ts
    
    return NextResponse.json({ success: true, message: 'Database seeded' });
  } catch (error) {
    return NextResponse.json({ error: 'Seeding failed' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
```

Then call it once:
```bash
curl -X POST https://your-project.vercel.app/api/seed \
  -H "Authorization: Bearer YOUR_SEED_SECRET"
```

---

## Troubleshooting

### Build Fails on Vercel

**Error: "Cannot find module '@prisma/client'"**
```bash
# Add postinstall script to package.json
{
  "scripts": {
    "postinstall": "prisma generate"
  }
}
```

**Error: "Database connection failed"**
- Verify `DATABASE_URL` is correct in Vercel environment variables
- Check if Render database is running
- Ensure database allows external connections

### Database Connection Issues

**Error: "Too many connections"**
- Use connection pooling (PgBouncer on Render)
- Update DATABASE_URL to use pooler connection string
- Add connection pooling to Prisma schema

### Application Errors

**Error: "AUTH_SECRET is not defined"**
- Add `AUTH_SECRET` to Vercel environment variables
- Redeploy after adding

**500 Internal Server Error**
- Check Vercel function logs: Dashboard → Functions → View logs
- Check if database is accessible
- Verify all environment variables are set

### Performance Issues

**Slow database queries**
- Add indexes to frequently queried fields
- Use Prisma query optimization
- Consider upgrading Render database plan

**Cold starts on Vercel**
- Use Vercel Pro plan for zero cold starts
- Implement ISR (Incremental Static Regeneration)
- Add edge caching for static content

---

## Environment Variables Reference

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string from Render | `postgresql://user:pass@host:5432/db` |
| `AUTH_SECRET` | Secret for JWT token signing (32+ chars) | `your-super-secret-key-min-32-chars` |

### Optional Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `production` |
| `NEXT_PUBLIC_APP_URL` | Public app URL for callbacks | Auto-detected |

---

## Useful Commands

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Link project
vercel link

# Pull environment variables
vercel env pull

# Deploy to preview
vercel

# Deploy to production
vercel --prod

# View logs
vercel logs

# Run Prisma migrations locally with production DB
DATABASE_URL="your-render-url" npx prisma db push
DATABASE_URL="your-render-url" npx prisma studio
```

---

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Render Documentation](https://render.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Prisma with Vercel](https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-vercel)

---

## Security Checklist

Before going live:
- ✅ Change all default passwords
- ✅ Use strong `AUTH_SECRET` (32+ random characters)
- ✅ Enable HTTPS only (Vercel does this automatically)
- ✅ Set up CORS if needed
- ✅ Review database access rules
- ✅ Enable rate limiting for API routes
- ✅ Set up monitoring and alerts
- ✅ Regular database backups (Render automatic backups)

---

## Cost Estimation

### Render (Database)
- **Free Tier**: $0/month (expires after 90 days)
- **Starter**: $7/month (1GB RAM, 1 CPU)
- **Standard**: $20/month (4GB RAM, 2 CPU)

### Vercel (Frontend)
- **Hobby**: Free (perfect for personal projects)
- **Pro**: $20/month (better performance, analytics)
- **Enterprise**: Custom pricing

**Estimated Total for Production**: $7-27/month

---

**Need Help?** Open an issue or contact support:
- Vercel Support: https://vercel.com/support
- Render Support: https://render.com/docs/support
