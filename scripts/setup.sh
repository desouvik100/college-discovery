#!/bin/bash

# College Discovery Platform - Setup Script
# This script automates the initial setup process

echo "🎓 College Discovery Platform Setup"
echo "===================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

echo "✅ Node.js found: $(node --version)"
echo ""

# Check if .env file exists
if [ ! -f .env ]; then
    echo "⚠️  No .env file found. Creating from .env.example..."
    cp .env.example .env
    echo "📝 Please edit .env file and add your PostgreSQL connection string"
    echo ""
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed"
echo ""

# Generate Prisma Client
echo "🔧 Generating Prisma Client..."
npm run db:generate

if [ $? -ne 0 ]; then
    echo "❌ Failed to generate Prisma Client"
    exit 1
fi

echo "✅ Prisma Client generated"
echo ""

# Push database schema
echo "🗄️  Pushing database schema..."
echo "⚠️  Make sure your DATABASE_URL in .env is correct!"
read -p "Press Enter to continue or Ctrl+C to cancel..."

npm run db:push

if [ $? -ne 0 ]; then
    echo "❌ Failed to push database schema"
    echo "Please check your DATABASE_URL in .env"
    exit 1
fi

echo "✅ Database schema created"
echo ""

# Seed database
echo "🌱 Seeding database with sample data..."
npm run db:seed

if [ $? -ne 0 ]; then
    echo "❌ Failed to seed database"
    exit 1
fi

echo "✅ Database seeded successfully"
echo ""

echo "🎉 Setup complete!"
echo ""
echo "To start the development server, run:"
echo "  npm run dev"
echo ""
echo "Then open http://localhost:3000 in your browser"
