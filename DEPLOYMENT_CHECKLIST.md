# 📋 Deployment Checklist

Use this checklist to ensure a smooth deployment process.

## Pre-Deployment

### Code Preparation
- [ ] All code committed and pushed to GitHub
- [ ] `.env` file is in `.gitignore` (never commit secrets!)
- [ ] No console.logs in production code
- [ ] All TypeScript errors resolved
- [ ] All ESLint warnings addressed
- [ ] Build succeeds locally: `npm run build`

### Repository Setup
- [ ] GitHub repository created
- [ ] Code pushed to `main` branch
- [ ] Repository is accessible (public or connected to Vercel)

### Account Setup
- [ ] GitHub account created
- [ ] Vercel account created (vercel.com)
- [ ] Render account created (render.com)

## Database Setup (Render)

- [ ] PostgreSQL database created on Render
- [ ] Database name: `college_discovery`
- [ ] External Database URL copied
- [ ] Database connection tested locally

## Vercel Deployment

### Initial Setup
- [ ] GitHub repository imported to Vercel
- [ ] Build settings configured (auto-detected for Next.js)
- [ ] First deployment attempted

### Environment Variables
Add these in Vercel → Settings → Environment Variables:

- [ ] `DATABASE_URL` (from Render External URL)
  - Format: `postgresql://user:pass@host:port/database`
  - Applied to: Production, Preview, Development
  
- [ ] `AUTH_SECRET` (generate 32+ random characters)
  - PowerShell: `-join ((48..57) + (65..90) + (97..122) | Get-Random -Count 32 | ForEach-Object {[char]$_})`
  - Applied to: Production, Preview, Development
  
- [ ] `NODE_ENV` = `production`
  - Applied to: Production only

### Redeploy
- [ ] After adding environment variables, redeploy from Vercel dashboard
- [ ] Wait for successful build
- [ ] Note the production URL

## Database Initialization

Run these commands locally with production database:

```bash
# Windows CMD
set DATABASE_URL=your-render-external-url
npx prisma db push
npx prisma db seed

# Windows PowerShell  
$env:DATABASE_URL="your-render-external-url"
npx prisma db push
npx prisma db seed
```

- [ ] Prisma schema pushed to production database
- [ ] Database seeded with college data
- [ ] Verify data in Render dashboard or Prisma Studio

## Post-Deployment Testing

### Basic Functionality
- [ ] Homepage loads without errors
- [ ] Explore page shows colleges
- [ ] Search functionality works
- [ ] Filters work correctly
- [ ] Pagination works
- [ ] College detail pages load

### User Features
- [ ] User registration works
- [ ] User login works
- [ ] Save/unsave colleges works
- [ ] User profile loads
- [ ] Logout works

### Performance
- [ ] Pages load in < 3 seconds
- [ ] Images load properly
- [ ] No console errors in browser
- [ ] Mobile responsive design works
- [ ] All API routes respond correctly

## Security & Optimization

### Security
- [ ] HTTPS enabled (automatic with Vercel)
- [ ] Environment variables secured
- [ ] Database connection encrypted
- [ ] Strong `AUTH_SECRET` used (32+ chars)
- [ ] No sensitive data in logs
- [ ] Rate limiting considered for API routes

### Performance
- [ ] Images optimized (Next.js Image component)
- [ ] Database queries optimized
- [ ] Proper indexes on frequently queried fields
- [ ] Static pages cached where possible

## Monitoring & Maintenance

### Setup Monitoring
- [ ] Vercel Analytics enabled
- [ ] Error tracking set up (optional: Sentry, LogRocket)
- [ ] Database monitoring on Render dashboard
- [ ] Uptime monitoring (optional: UptimeRobot)

### Documentation
- [ ] README updated with live URL
- [ ] Environment variables documented
- [ ] Deployment process documented

### Backup & Recovery
- [ ] Database backup strategy confirmed (Render auto-backups)
- [ ] Recovery process tested
- [ ] Rollback plan documented

## Production URLs

Record your production URLs:

- [ ] **Vercel Production URL**: https://________________.vercel.app
- [ ] **Custom Domain** (if added): https://________________
- [ ] **Render Database Dashboard**: https://________________
- [ ] **GitHub Repository**: https://github.com/________________

## Optional Enhancements

### Custom Domain
- [ ] Domain purchased
- [ ] Domain added in Vercel settings
- [ ] DNS records configured
- [ ] SSL certificate provisioned

### Analytics & SEO
- [ ] Vercel Analytics enabled
- [ ] Google Analytics added (if needed)
- [ ] Meta tags optimized
- [ ] sitemap.xml created
- [ ] robots.txt configured

### CI/CD
- [ ] GitHub Actions workflow set up
- [ ] Automated tests on PR
- [ ] Automatic deployment on merge

## Troubleshooting Done

If you encountered issues, mark them resolved:

- [ ] Build errors resolved
- [ ] Database connection issues fixed
- [ ] Environment variable issues fixed
- [ ] Prisma generation errors fixed
- [ ] Runtime errors addressed

## Sign-Off

- [ ] Deployment completed successfully
- [ ] All features tested and working
- [ ] Team/stakeholders notified
- [ ] Documentation updated

---

## Quick Reference Links

- **Vercel Dashboard**: https://vercel.com/dashboard
- **Render Dashboard**: https://dashboard.render.com
- **GitHub Repo**: (your repository URL)
- **Deployment Guide**: See DEPLOYMENT_GUIDE.md
- **Quick Deploy**: See QUICK_DEPLOY.md

---

**Deployment Date**: ________________

**Deployed By**: ________________

**Production URL**: ________________

**Notes**: 
```
(Add any deployment notes here)
```

---

✅ **Congratulations on your deployment!** 🎉
