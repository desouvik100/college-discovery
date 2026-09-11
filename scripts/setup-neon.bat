@echo off
REM Neon PostgreSQL Database Setup Script for Windows

echo.
echo ========================================
echo   College Discovery - Neon DB Setup
echo ========================================
echo.

REM Check Node.js
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Node.js not found. Please install Node.js 18+
    exit /b 1
)

echo ✅ Node.js: 
node --version
echo.

REM Check if .env exists
if not exist .env (
    echo ⚠️  .env file not found!
    echo.
    echo Please create .env file with your Neon connection string:
    echo.
    echo DATABASE_URL="postgresql://user:pass@ep-xxx.region.aws.neon.tech/neondb?sslmode=require"
    echo NEXT_PUBLIC_BASE_URL="http://localhost:3000"
    echo NODE_ENV="development"
    echo.
    echo Get your connection string from: https://console.neon.tech
    echo.
    pause
    exit /b 1
)

echo ✅ .env file found
echo.

REM Check if dependencies are installed
if not exist node_modules (
    echo 📦 Installing dependencies...
    call npm install
    if %errorlevel% neq 0 (
        echo ❌ Failed to install dependencies
        exit /b 1
    )
    echo ✅ Dependencies installed
    echo.
)

REM Step 1: Generate Prisma Client
echo.
echo ========================================
echo   Step 1: Generating Prisma Client
echo ========================================
echo.

call npm run db:generate
if %errorlevel% neq 0 (
    echo ❌ Failed to generate Prisma Client
    exit /b 1
)

echo ✅ Prisma Client generated
echo.

REM Step 2: Push Schema to Neon
echo.
echo ========================================
echo   Step 2: Pushing Schema to Neon
echo ========================================
echo.
echo This will create tables in your Neon database.
echo Make sure your DATABASE_URL is correct!
echo.
pause

call npm run db:push
if %errorlevel% neq 0 (
    echo ❌ Failed to push schema to database
    echo.
    echo Troubleshooting:
    echo 1. Check your DATABASE_URL in .env
    echo 2. Ensure Neon project is active
    echo 3. Verify connection string includes ?sslmode=require
    echo.
    exit /b 1
)

echo ✅ Schema pushed to Neon database
echo.

REM Step 3: Seed Database
echo.
echo ========================================
echo   Step 3: Seeding Database
echo ========================================
echo.
echo This will populate your database with:
echo - 20 colleges
echo - 60 courses
echo - 60+ placement records
echo - 60+ reviews
echo - 3 exams
echo - 200+ admission cutoffs
echo.
pause

call npm run db:seed
if %errorlevel% neq 0 (
    echo ❌ Failed to seed database
    exit /b 1
)

echo ✅ Database seeded successfully
echo.

REM Step 4: Verify Database
echo.
echo ========================================
echo   Step 4: Verifying Database
echo ========================================
echo.

call npm run db:verify
if %errorlevel% neq 0 (
    echo ❌ Database verification failed
    exit /b 1
)

echo.
echo ========================================
echo   🎉 Setup Complete!
echo ========================================
echo.
echo Your Neon database is ready!
echo.
echo Next steps:
echo   1. Start dev server: npm run dev
echo   2. Open: http://localhost:3000
echo   3. Optional: Open Prisma Studio: npm run db:studio
echo.
echo Database commands:
echo   npm run db:verify  - Check database status
echo   npm run db:studio  - Visual database browser
echo   npm run db:seed    - Re-seed database
echo.
pause
