# Database Setup Guide - Neon PostgreSQL

This guide walks you through setting up the PostgreSQL database on Neon for the College Discovery Platform.

## Prerequisites

- [ ] Neon account (sign up at [neon.tech](https://neon.tech))
- [ ] Node.js 18+ installed
- [ ] Project dependencies installed (`npm install`)

## Step 1: Create Neon Database

1. Go to [console.neon.tech](https://console.neon.tech)
2. Click "Create Project"
3. Project name: `college-discovery` (or your choice)
4. Region: Choose closest to you
5. Click "Create Project"

## Step 2: Get Connection String

After creating the project:

1. You'll see a connection string like:
   ```
   postgresql://username:password@ep-xxx.region.aws.neon.tech/neondb?sslmode=require
   ```

2. Copy this connection string

3. Create `.env` file in project root:
   ```bash
   DATABASE_URL="your_connection_string_here"
   NEXT_PUBLIC_BASE_URL="http://localhost:3000"
   NODE_ENV="development"
   ```

**Important:** Never commit `.env` to Git!

## Step 3: Understand the Database Schema

Our schema has 6 models:

### Core Models

**College**
- Stores college information (name, location, fees, rating, type)
- Primary entity for search, filtering, comparison
- Indexed on: name, state, rating, totalFees

**Course**
- Programs offered by each college
- Linked to College (Many-to-One)
- Contains: name, duration, fees, seats, eligibility

**PlacementStats**
- Yearly placement records for each college
- Linked to College (Many-to-One)
- Contains: packages, placement rate, top recruiters

**Review**
- Student reviews for colleges
- Linked to College (Many-to-One)
- Contains: rating, title, content, author details

**Exam**
- Entrance exams (JEE Main, NEET, etc.)
- Referenced by admission cutoffs
- Contains: name, code, description

**AdmissionCutoff**
- Historical cutoff data for predictor
- Links: College + Course + Exam
- Contains: opening/closing ranks by category
- Indexed on: examId, ranks, category

### Relationships

```
College (1) ----< (Many) Course
College (1) ----< (Many) PlacementStats
College (1) ----< (Many) Review
College (1) ----< (Many) AdmissionCutoff

Course (1) ----< (Many) AdmissionCutoff
Exam (1) ----< (Many) AdmissionCutoff
```

## Step 4: Generate Prisma Client

This creates the TypeScript types based on your schema:

```bash
npm run db:generate
```

**Expected output:**
```
✔ Generated Prisma Client
```

This creates `node_modules/@prisma/client` with type-safe database access.

## Step 5: Push Schema to Neon (Development)

For development, we use `db:push` (creates tables without migration files):

```bash
npm run db:push
```

**Expected output:**
```
🚀  Your database is now in sync with your Prisma schema.
```

This creates all 6 tables in your Neon database.

### Alternative: Migrations (Production Workflow)

For production or when you need migration history:

```bash
npm run db:migrate
```

This creates migration files in `prisma/migrations/` that can be version controlled.

## Step 6: Seed the Database

Load realistic college data:

```bash
npm run db:seed
```

**This creates:**
- ✅ 20 colleges (IITs, NITs, BITS, VIT, etc.)
- ✅ 60 courses (3 per college)
- ✅ 60 placement records (3 years per college)
- ✅ 60 student reviews (3 per college)
- ✅ 3 exams (JEE Main, JEE Advanced, NEET)
- ✅ 200+ admission cutoffs (for predictor)

**Expected output:**
```
Starting database seed...
Created exams
Creating colleges...
Created college: Indian Institute of Technology Delhi
Created college: Indian Institute of Technology Bombay
...
Creating admission cutoffs...
Database seeded successfully!
```

## Step 7: Verify Database Setup

Run the verification script:

```bash
npm run db:verify
```

**Expected output:**
```
🔍 Verifying database connection...

✅ Database connection successful!

📊 Database Statistics:
   Colleges: 20
   Courses: 60
   Reviews: 60
   Placement Stats: 60
   Exams: 3
   Admission Cutoffs: 200+

📌 Sample College:
   Name: Indian Institute of Technology Delhi
   Location: New Delhi, Delhi
   Rating: 4.8
   Courses: B.Tech Computer Science and Engineering

✅ Database verification complete!
```

## Step 8: Open Prisma Studio (Optional)

Visual database browser:

```bash
npm run db:studio
```

This opens `http://localhost:5555` where you can:
- Browse all tables
- View records
- Edit data
- Test relationships

## Troubleshooting

### Connection Failed

**Error:** `Can't reach database server`

**Solutions:**
1. Check your `DATABASE_URL` in `.env`
2. Ensure Neon project is active (not sleeping)
3. Check internet connection
4. Verify connection string has `?sslmode=require`

### Schema Out of Sync

**Error:** `Schema is not in sync with database`

**Solution:**
```bash
npm run db:push
```

### Seed Script Fails

**Error:** Various Prisma errors

**Solutions:**
1. Ensure schema is pushed: `npm run db:push`
2. Reset and try again:
   ```bash
   npm run db:reset
   npm run db:seed
   ```

### Port Already in Use (Prisma Studio)

**Solution:** Kill the process or use different port:
```bash
npx prisma studio --port 5556
```

## Database Commands Reference

```bash
# Generate Prisma Client (after schema changes)
npm run db:generate

# Push schema to database (dev - no migrations)
npm run db:push

# Create migration (production workflow)
npm run db:migrate

# Deploy migrations (production)
npm run db:migrate:deploy

# Seed database with data
npm run db:seed

# Verify database connection and data
npm run db:verify

# Open Prisma Studio (visual browser)
npm run db:studio

# Reset database (WARNING: Deletes all data)
npm run db:reset
```

## Verifying API Integration

After database setup, test the APIs:

### Test 1: College List
```bash
curl http://localhost:3000/api/colleges?limit=5
```

Should return JSON with colleges.

### Test 2: College Detail
Get a college ID from Test 1, then:
```bash
curl http://localhost:3000/api/colleges/{college-id}
```

### Test 3: Exams List
```bash
curl http://localhost:3000/api/exams
```

### Test 4: Predictor
```bash
curl -X POST http://localhost:3000/api/predict \
  -H "Content-Type: application/json" \
  -d '{"examCode":"JEE_MAIN","rank":5000,"category":"GENERAL"}'
```

## Production Deployment

### Neon for Production

1. Create separate Neon project for production
2. Get production connection string
3. Add to Vercel environment variables:
   ```
   DATABASE_URL="production_connection_string"
   ```
4. Deploy migrations:
   ```bash
   npm run db:migrate:deploy
   ```
5. Seed production database:
   ```bash
   npm run db:seed
   ```

### Connection Pooling

Neon automatically handles connection pooling. For serverless:
- Use `?pgbouncer=true` in connection string
- Or use Prisma Data Proxy for edge functions

## Database Maintenance

### Backup Data

Neon provides automatic backups. To export manually:

```bash
# Using Prisma
npx prisma db pull
```

### Monitor Performance

Check Neon dashboard for:
- Query performance
- Connection count
- Storage usage
- Database size

### Index Optimization

Our schema includes indexes on:
- `College.name` - for search
- `College.state` - for filtering
- `College.rating` - for sorting
- `College.totalFees` - for filtering
- `AdmissionCutoff.examId` - for predictor
- `AdmissionCutoff.openingRank` - for predictor
- `AdmissionCutoff.closingRank` - for predictor

## Schema Evolution

When modifying schema:

1. Edit `prisma/schema.prisma`
2. Generate new client:
   ```bash
   npm run db:generate
   ```
3. Create migration:
   ```bash
   npm run db:migrate
   ```
4. Update seed script if needed
5. Test locally before deploying

## Security Best Practices

✅ Never commit `.env` to Git  
✅ Use environment variables for credentials  
✅ Rotate database passwords periodically  
✅ Use read-only replicas for reporting (if needed)  
✅ Enable row-level security (RLS) for multi-tenant apps  
✅ Monitor for suspicious query patterns  

## Next Steps

After successful database setup:

1. ✅ Start development server: `npm run dev`
2. ✅ Test frontend: `http://localhost:3000`
3. ✅ Verify college listing works
4. ✅ Verify search and filters work
5. ✅ Verify college detail pages work
6. ✅ Verify comparison works
7. ✅ Verify predictor works

## Need Help?

Common issues and solutions:

| Issue | Solution |
|-------|----------|
| Connection timeout | Check Neon project is active |
| Schema errors | Run `npm run db:push` |
| No data | Run `npm run db:seed` |
| Old data | Run `npm run db:reset` |
| Type errors | Run `npm run db:generate` |
| Port conflicts | Change port or kill process |

For Neon-specific issues: [docs.neon.tech](https://neon.tech/docs)
For Prisma issues: [prisma.io/docs](https://www.prisma.io/docs)

---

**Ready to proceed?** Follow steps 1-7 to set up your database!
