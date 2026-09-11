@echo off
REM College Discovery Platform - Setup Script for Windows
REM This script automates the initial setup process

echo.
echo 🎓 College Discovery Platform Setup
echo ====================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js 18+ first.
    exit /b 1
)

node --version
echo ✅ Node.js found
echo.

REM Check if .env file exists
if not exist .env (
    echo ⚠️  No .env file found. Creating from .env.example...
    copy .env.example .env
    echo 📝 Please edit .env file and add your PostgreSQL connection string
    echo.
)

REM Install dependencies
echo 📦 Installing dependencies...
call npm install

if %errorlevel% neq 0 (
    echo ❌ Failed to install dependencies
    exit /b 1
)

echo ✅ Dependencies installed
echo.

REM Generate Prisma Client
echo 🔧 Generating Prisma Client...
call npm run db:generate

if %errorlevel% neq 0 (
    echo ❌ Failed to generate Prisma Client
    exit /b 1
)

echo ✅ Prisma Client generated
echo.

REM Push database schema
echo 🗄️  Pushing database schema...
echo ⚠️  Make sure your DATABASE_URL in .env is correct!
pause

call npm run db:push

if %errorlevel% neq 0 (
    echo ❌ Failed to push database schema
    echo Please check your DATABASE_URL in .env
    exit /b 1
)

echo ✅ Database schema created
echo.

REM Seed database
echo 🌱 Seeding database with sample data...
call npm run db:seed

if %errorlevel% neq 0 (
    echo ❌ Failed to seed database
    exit /b 1
)

echo ✅ Database seeded successfully
echo.

echo 🎉 Setup complete!
echo.
echo To start the development server, run:
echo   npm run dev
echo.
echo Then open http://localhost:3000 in your browser
echo.
pause
