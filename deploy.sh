#!/bin/bash

echo "🚀 College Discovery Deployment Script"
echo "======================================="
echo ""

echo "This script will help you deploy to Vercel"
echo ""

echo "Prerequisites:"
echo "1. Git repository initialized and pushed to GitHub"
echo "2. Vercel account created"
echo "3. Render PostgreSQL database created"
echo ""

read -p "Have you completed all prerequisites? (y/n) " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]
then
    echo "Please complete prerequisites first. See DEPLOYMENT_GUIDE.md"
    exit 1
fi

echo ""
echo "Installing Vercel CLI..."
npm install -g vercel

echo ""
echo "Logging into Vercel..."
vercel login

echo ""
echo "⚠️  Before deploying, make sure you have:"
echo "1. Your Render PostgreSQL DATABASE_URL"
echo "2. A strong AUTH_SECRET (32+ characters)"
echo ""

read -p "Ready to deploy? (y/n) " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]
then
    echo ""
    echo "Deploying to Vercel..."
    vercel --prod
    
    echo ""
    echo "✅ Deployment initiated!"
    echo ""
    echo "Next steps:"
    echo "1. Add environment variables in Vercel dashboard:"
    echo "   - DATABASE_URL (from Render)"
    echo "   - AUTH_SECRET (generate strong secret)"
    echo ""
    echo "2. After adding env vars, run database migrations:"
    echo "   DATABASE_URL='your-render-url' npx prisma db push"
    echo "   DATABASE_URL='your-render-url' npx prisma db seed"
    echo ""
    echo "3. Visit your deployment URL and test the application"
    echo ""
fi
