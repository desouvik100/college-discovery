# 🎓 College Discovery Platform

A comprehensive college discovery and comparison platform built with Next.js 14, TypeScript, PostgreSQL, and Prisma ORM. Help students find their perfect college match with advanced search, filtering, and comparison features.

## ✨ Features

- **🔍 Advanced Search & Filtering**: Search colleges by name, location, type, fees, ratings, and more
- **📊 College Comparison**: Compare multiple colleges side-by-side
- **🎯 College Predictor**: Predict admission chances based on exam scores
- **💾 Save Favorites**: Bookmark colleges for later reference
- **👤 User Authentication**: Secure registration and login system
- **📱 Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **⚡ Fast Performance**: Built with Next.js 14 App Router for optimal speed
- **🎨 Modern UI**: Clean, professional interface with Tailwind CSS

## 🚀 Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT with bcrypt
- **Styling**: Tailwind CSS
- **Validation**: Zod
- **Hosting**: Vercel (Frontend) + Render (Database)

## 📦 Quick Start

### Prerequisites

- Node.js 20+ and npm
- PostgreSQL database
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/college-discovery.git
   cd college-discovery
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your database URL and auth secret:
   ```
   DATABASE_URL="postgresql://user:password@localhost:5432/college_discovery"
   AUTH_SECRET="your-secure-random-secret-at-least-32-chars-long"
   ```

4. **Initialize database**
   ```bash
   npx prisma db push
   npx prisma db seed
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   ```
   http://localhost:3000
   ```

## 🌐 Deployment

Deploy your application to production in minutes!

### Quick Deploy (15 minutes)

1. **Deploy Database to Render**
   - Sign up at [render.com](https://render.com)
   - Create PostgreSQL database
   - Copy External Database URL

2. **Deploy App to Vercel**
   - Sign up at [vercel.com](https://vercel.com)
   - Import GitHub repository
   - Add environment variables
   - Deploy!

**📖 See detailed guides:**
- [QUICK_DEPLOY.md](./QUICK_DEPLOY.md) - 15-minute deployment guide
- [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) - Complete deployment documentation
- [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md) - Step-by-step checklist

### Deploy with One Command (Windows)

```bash
deploy.bat
```

### Deploy with Vercel CLI

```bash
npm install -g vercel
vercel login
vercel --prod
```

## 📂 Project Structure

```
college-discovery/
├── app/                      # Next.js 14 App Router
│   ├── api/                  # API routes
│   │   ├── auth/            # Authentication endpoints
│   │   ├── colleges/        # College CRUD operations
│   │   └── predict/         # Admission prediction
│   ├── colleges/            # College pages
│   ├── explore/             # Search and filter page
│   ├── compare/             # Comparison page
│   └── account/             # User profile pages
├── components/              # React components
│   ├── colleges/           # College-related components
│   ├── layout/             # Layout components
│   └── ui/                 # Reusable UI components
├── lib/                    # Utility functions
│   ├── db.ts              # Prisma client
│   ├── auth.ts            # Authentication utilities
│   └── types.ts           # TypeScript types
├── prisma/                # Database schema and seeds
│   ├── schema.prisma      # Database schema
│   └── seed.ts            # Seed data
└── services/              # Business logic
    ├── collegeService.ts
    └── predictorService.ts
```

## 🎯 Key Features Explained

### College Search & Filtering
- Search by name, city, or state
- Filter by college type, fees range, rating
- Sort by rating, fees, or name
- Pagination for large result sets

### College Comparison
- Compare up to 4 colleges simultaneously
- Side-by-side comparison of fees, courses, placements
- Visual indicators for better comparison
- Save comparisons for future reference

### Admission Predictor
- Predict admission chances based on exam scores
- Support for JEE Main, JEE Advanced, BITSAT, NEET
- Consider category (General, OBC, SC, ST, EWS)
- Historical cutoff data analysis

### User Authentication
- Secure JWT-based authentication
- Password hashing with bcrypt
- Protected routes and API endpoints
- User profile management

## 🛠️ Development

### Available Scripts

```bash
npm run dev              # Start development server
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Run ESLint
npm run db:push          # Push schema to database
npm run db:seed          # Seed database with data
npm run db:studio        # Open Prisma Studio
npm run db:migrate       # Run database migrations
```

### Database Management

```bash
# Generate Prisma Client
npm run db:generate

# Push schema changes
npm run db:push

# Seed database
npm run db:seed

# Open Prisma Studio (Database GUI)
npm run db:studio

# Reset database (caution!)
npm run db:reset
```

## 🗃️ Database Schema

The application uses PostgreSQL with the following main tables:
- `User` - User accounts and authentication
- `College` - College information and details
- `Course` - Courses offered by colleges
- `Exam` - Entrance exams (JEE, NEET, etc.)
- `AdmissionCutoff` - Historical cutoff data
- `PlacementStats` - Placement statistics
- `Review` - College reviews
- `SavedCollege` - User's saved colleges
- `SavedComparison` - User's saved comparisons

See [DATABASE_SCHEMA.md](./DATABASE_SCHEMA.md) for complete schema documentation.

## 🏗️ Architecture

See [ARCHITECTURE.md](./ARCHITECTURE.md) for detailed architecture documentation.

## 📊 Sample Data

The seed script includes 150+ Indian colleges with:
- IITs, NITs, IIITs, BITS Pilani
- Top medical colleges (AIIMS, CMC, etc.)
- Premier state and private universities
- Realistic placement statistics
- Historical admission cutoffs
- Student reviews

## 🔐 Environment Variables

Required environment variables:

```bash
# Database
DATABASE_URL="postgresql://user:password@host:port/database"

# Authentication
AUTH_SECRET="minimum-32-characters-random-string"

# Application
NODE_ENV="development" # or "production"
```

Generate a secure `AUTH_SECRET`:
```powershell
# PowerShell
-join ((48..57) + (65..90) + (97..122) | Get-Random -Count 32 | ForEach-Object {[char]$_})
```

## 🧪 Testing

Test the deployment:
```bash
# Test user registration
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123","name":"Test User"}'

# Test college search
curl http://localhost:3000/api/colleges?search=IIT
```

## 📝 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user

### College Endpoints
- `GET /api/colleges` - List colleges with filters
- `GET /api/colleges/[id]` - Get college details
- `GET /api/colleges/compare` - Compare colleges

### Predictor Endpoint
- `POST /api/predict` - Predict admission chances

### User Data Endpoints
- `GET /api/saved-colleges` - Get saved colleges
- `POST /api/saved-colleges` - Save a college
- `DELETE /api/saved-colleges/[id]` - Unsave a college

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

- **Documentation**: See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
- **Issues**: Open an issue on GitHub
- **Quick Start**: See [QUICK_START.md](./QUICK_START.md)

## 🙏 Acknowledgments

- College data sourced from publicly available information
- Images from Wikimedia Commons
- Built with Next.js, Prisma, and Tailwind CSS

## 📈 Roadmap

- [ ] Add more colleges and courses
- [ ] Implement advanced search with AI
- [ ] Add college reviews and ratings
- [ ] Implement real-time notifications
- [ ] Add scholarship information
- [ ] Mobile app (React Native)
- [ ] Integration with college websites
- [ ] Virtual campus tours

## 💰 Hosting Costs

- **Development**: Free (local)
- **Production**:
  - Vercel Hobby: Free forever
  - Render PostgreSQL: $7/month
  - **Total: ~$7/month**

## 🔗 Links

- **Live Demo**: (Add your Vercel URL after deployment)
- **Documentation**: [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
- **GitHub**: (Your repository URL)

---

**Made with ❤️ for students seeking their dream college**

**Star ⭐ this repo if you find it helpful!**
