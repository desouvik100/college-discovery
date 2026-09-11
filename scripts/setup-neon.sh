#!/bin/bash

# Neon PostgreSQL Database Setup Script for Mac/Linux

echo ""
echo "========================================"
echo "  College Discovery - Neon DB Setup"
echo "========================================"
echo ""

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Please install Node.js 18+"
    exit 1
fi

echo "✅ Node.js: $(node --version)"
echo ""

# Check if .env exists
if [ ! -f .env ]; then
    echo "⚠️  .env file not found!"
    echo ""
    echo "Please create .env file with your Neon connection string:"
    echo ""
    echo 'DATABASE_URL="postgresql://user:pass@ep-xxx.region.aws.neon.tech/neondb?sslmode=require"'
    echo 'NEXT_PUBLIC_BASE_URL="http://localhost:3000"'
    echo 'NODE_ENV="development"'
    echo ""
    echo "Get your connection string from: https://console.neon.tech"
    echo ""
    exit 1
fi

echo "✅ .env file found"
echo ""

# Check if dependencies are installed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ Failed to install dependencies"
        exit 1
    fi
    echo "✅ Dependencies installed"
    echo ""
fi

# Step 1: Generate Prisma Client
echo ""
echo "========================================"
echo "  Step 1: Generating Prisma Client"
echo "========================================"
echo ""

npm run db:generate
if [ $? -ne 0 ]; then
    echo "❌ Failed to generate Prisma Client"
    exit 1
fi

echo "✅ Prisma Client generated"
echo ""

# Step 2: Push Schema to Neon
echo ""
echo "========================================"
echo "  Step 2: Pushing Schema to Neon"
echo "========================================"
echo ""
echo "This will create tables in your Neon database."
echo "Make sure your DATABASE_URL is correct!"
echo ""
read -p "Press Enter to continue or Ctrl+C to cancel..."

npm run db:push
if [ $? -ne 0 ]; then
    echo "❌ Failed to push schema to database"
    echo ""
    echo "Troubleshooting:"
    echo "1. Check your DATABASE_URL in .env"
    echo "2. Ensure Neon project is active"
    echo "3. Verify connection string includes ?sslmode=require"
    echo ""
    exit 1
fi

echo "✅ Schema pushed to Neon database"
echo ""

# Step 3: Seed Database
echo ""
echo "========================================"
echo "  Step 3: Seeding Database"
echo "========================================"
echo ""
echo "This will populate your database with:"
echo "- 20 colleges"
echo "- 60 courses"
echo "- 60+ placement records"
echo "- 60+ reviews"
echo "- 3 exams"
echo "- 200+ admission cutoffs"
echo ""
read -p "Press Enter to continue..."

npm run db:seed
if [ $? -ne 0 ]; then
    echo "❌ Failed to seed database"
    exit 1
fi

echo "✅ Database seeded successfully"
echo ""

# Step 4: Verify Database
echo ""
echo "========================================"
echo "  Step 4: Verifying Database"
echo "========================================"
echo ""

npm run db:verify
if [ $? -ne 0 ]; then
    echo "❌ Database verification failed"
    exit 1
fi

echo ""
echo "========================================"
echo "  🎉 Setup Complete!"
echo "========================================"
echo ""
echo "Your Neon database is ready!"
echo ""
echo "Next steps:"
echo "  1. Start dev server: npm run dev"
echo "  2. Open: http://localhost:3000"
echo "  3. Optional: Open Prisma Studio: npm run db:studio"
echo ""
echo "Database commands:"
echo "  npm run db:verify  - Check database status"
echo "  npm run db:studio  - Visual database browser"
echo "  npm run db:seed    - Re-seed database"
echo ""
