@echo off
echo ========================================
echo   College Discovery Deployment Script
echo ========================================
echo.

echo This script will help you deploy to Vercel
echo.

echo Prerequisites:
echo 1. Git repository initialized and pushed to GitHub
echo 2. Vercel account created
echo 3. Render PostgreSQL database created
echo.

set /p prerequisites="Have you completed all prerequisites? (y/n): "

if /i not "%prerequisites%"=="y" (
    echo.
    echo Please complete prerequisites first. See DEPLOYMENT_GUIDE.md
    pause
    exit /b
)

echo.
echo Installing Vercel CLI...
call npm install -g vercel

echo.
echo Logging into Vercel...
call vercel login

echo.
echo WARNING: Before deploying, make sure you have:
echo 1. Your Render PostgreSQL DATABASE_URL
echo 2. A strong AUTH_SECRET (32+ characters)
echo.

set /p ready="Ready to deploy? (y/n): "

if /i "%ready%"=="y" (
    echo.
    echo Deploying to Vercel...
    call vercel --prod
    
    echo.
    echo ========================================
    echo   Deployment Initiated Successfully!
    echo ========================================
    echo.
    echo Next steps:
    echo 1. Add environment variables in Vercel dashboard:
    echo    - DATABASE_URL (from Render)
    echo    - AUTH_SECRET (generate strong secret)
    echo.
    echo 2. After adding env vars, run database migrations:
    echo    set DATABASE_URL=your-render-url
    echo    npx prisma db push
    echo    npx prisma db seed
    echo.
    echo 3. Visit your deployment URL and test the application
    echo.
)

pause
