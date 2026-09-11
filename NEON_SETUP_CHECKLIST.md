# Neon PostgreSQL Setup Checklist

Use this checklist to ensure your database is properly set up and integrated.

## Pre-Setup

- [ ] Node.js 18+ installed (`node --version`)
- [ ] Git repository cloned
- [ ] Dependencies installed (`npm install`)
- [ ] Neon account created at [console.neon.tech](https://console.neon.tech)

## Neon Database Creation

- [ ] Logged into Neon console
- [ ] Created new project (name: `college-discovery` or similar)
- [ ] Selected region closest to you
- [ ] Copied connection string
- [ ] Connection string includes `?sslmode=require`

## Environment Configuration

- [ ] Created `.env` file in project root
- [ ] Added `DATABASE_URL` with Neon connection string
- [ ] Added `NEXT_PUBLIC_BASE_URL="http://localhost:3000"`
- [ ] Added `NODE_ENV="development"`
- [ ] Verified `.env` is in `.gitignore`
- [ ] `.env.example` exists for reference

## Prisma Setup

- [ ] Generated Prisma Client (`npm run db:generate`)
- [ ] No TypeScript errors in terminal
- [ ] `node_modules/@prisma/client` directory exists
- [ ] Schema pushed to Neon (`npm run db:push`)
- [ ] No database connection errors

## Database Seeding

- [ ] Seed script executed (`npm run db:seed`)
- [ ] Seed completed without errors
- [ ] Saw "Database seeded successfully!" message

## Database Verification

Run `npm run db:verify` and confirm:

- [ ] ✅ Database connection successful
- [ ] Colleges count: 20
- [ ] Courses count: 60
- [ ] Reviews count: 60
- [ ] Placement Stats count: 60
- [ ] Exams count: 3
- [ ] Admission Cutoffs count: 200+
- [ ] Sample college displayed with data

## Prisma Studio (Optional)

- [ ] Opened Prisma Studio (`npm run db:studio`)
- [ ] Studio opened at `http://localhost:5555`
- [ ] Can browse College table
- [ ] Can see all 20 colleges
- [ ] Relations work (click on college → see courses)

## API Verification

Start dev server (`npm run dev`) and test:

### Test 1: College List API
```bash
curl http://localhost:3000/api/colleges?limit=5
```
- [ ] Returns JSON response
- [ ] Contains "colleges" array
- [ ] Contains "pagination" object
- [ ] Colleges have id, name, location, rating, totalFees

### Test 2: College Detail API
Get a college ID from Test 1, then:
```bash
curl http://localhost:3000/api/colleges/{COLLEGE_ID}
```
- [ ] Returns single college object
- [ ] Contains "courses" array
- [ ] Contains "placementStats" array
- [ ] Contains "reviews" array

### Test 3: Exams API
```bash
curl http://localhost:3000/api/exams
```
- [ ] Returns "exams" array
- [ ] Contains JEE Main
- [ ] Contains JEE Advanced
- [ ] Contains NEET

### Test 4: Predictor API
```bash
curl -X POST http://localhost:3000/api/predict \
  -H "Content-Type: application/json" \
  -d '{"examCode":"JEE_MAIN","rank":5000,"category":"GENERAL"}'
```
- [ ] Returns "predictions" array
- [ ] Contains college and course information
- [ ] Contains probability categories
- [ ] Contains explanations

### Test 5: Compare API
Get 2-3 college IDs, then:
```bash
curl "http://localhost:3000/api/colleges/compare?ids=ID1,ID2"
```
- [ ] Returns "colleges" array
- [ ] Contains placement stats
- [ ] Has 2 colleges in response

## Frontend Verification

With dev server running (`npm run dev`):

### Home Page (http://localhost:3000)
- [ ] Page loads without errors
- [ ] College cards displayed
- [ ] Shows 12 colleges per page
- [ ] Search bar present
- [ ] Filter panel present
- [ ] Pagination controls present

### Search Functionality
- [ ] Type "IIT" in search
- [ ] Results filter to IIT colleges
- [ ] Shows correct count
- [ ] Can clear search

### Filter Functionality
- [ ] Select state (e.g., "Delhi")
- [ ] Results update
- [ ] Select college type (e.g., "Government")
- [ ] Results update further
- [ ] Can clear filters

### College Detail Page
- [ ] Click on any college card
- [ ] Detail page loads
- [ ] Shows college name and info
- [ ] Shows courses section
- [ ] Shows placement statistics
- [ ] Shows student reviews
- [ ] No data is hardcoded (all from database)

### Comparison Page (http://localhost:3000/compare)
- [ ] Page loads
- [ ] College selector present
- [ ] Can search for colleges
- [ ] Can select 2-3 colleges
- [ ] Comparison table displays
- [ ] Shows fees, ratings, placements
- [ ] Visual indicators for best values (green)
- [ ] Can remove colleges

### Predictor Page (http://localhost:3000/predictor)
- [ ] Page loads
- [ ] Form shows exam dropdown
- [ ] Exams loaded from database
- [ ] Can enter rank
- [ ] Can select category
- [ ] Submit button works
- [ ] Results display with probabilities
- [ ] Shows HIGH, MODERATE, LOW categories
- [ ] Explanations provided

## Data Integrity Checks

In Prisma Studio or via queries:

- [ ] All colleges have state and city
- [ ] All colleges have ratings between 1-5
- [ ] All courses link to valid colleges
- [ ] All placement stats link to valid colleges
- [ ] All reviews link to valid colleges
- [ ] All cutoffs link to valid colleges, courses, exams
- [ ] No orphaned records

## Console Checks

Browser Console (F12):
- [ ] No JavaScript errors on home page
- [ ] No errors on detail page
- [ ] No errors on compare page
- [ ] No errors on predictor page
- [ ] No 404 errors for API calls
- [ ] No CORS errors

Server Console:
- [ ] No Prisma connection errors
- [ ] No query errors
- [ ] API requests logged (if logging enabled)

## Performance Checks

- [ ] Home page loads < 2 seconds
- [ ] Search returns results < 500ms
- [ ] Detail page loads < 1 second
- [ ] Predictor returns results < 1 second
- [ ] No noticeable lag in UI interactions

## Mobile Responsiveness

Test on mobile or resize browser:
- [ ] Home page responsive
- [ ] Filters accessible on mobile
- [ ] College cards stack properly
- [ ] Detail page readable on mobile
- [ ] Comparison table scrollable
- [ ] Predictor form usable on mobile

## Common Issues & Solutions

### Issue: "Can't reach database server"
**Solutions:**
- [ ] Check DATABASE_URL in .env is correct
- [ ] Ensure Neon project is active (not paused)
- [ ] Check internet connection
- [ ] Verify connection string has `?sslmode=require`

### Issue: "Schema not in sync"
**Solution:**
- [ ] Run `npm run db:push`

### Issue: "No colleges found"
**Solution:**
- [ ] Run `npm run db:seed`
- [ ] Run `npm run db:verify` to confirm

### Issue: "Prisma Client not generated"
**Solution:**
- [ ] Run `npm run db:generate`
- [ ] Restart dev server

### Issue: "Port 3000 already in use"
**Solution:**
- [ ] Kill existing process
- [ ] Or use different port: `PORT=3001 npm run dev`

## Production Deployment Checklist

When ready to deploy:

- [ ] Create production Neon database
- [ ] Get production connection string
- [ ] Add to Vercel environment variables
- [ ] Deploy to Vercel
- [ ] Run migrations in production
- [ ] Seed production database (optional)
- [ ] Test production URLs
- [ ] Verify production API responses
- [ ] Check production console for errors

## Documentation Review

- [ ] Read README.md
- [ ] Read DATABASE_SETUP.md
- [ ] Read DATABASE_SCHEMA.md
- [ ] Understand database architecture
- [ ] Understand API contracts

## Final Verification

- [ ] All 4 main features work:
  - [ ] College listing with search/filter
  - [ ] College detail pages
  - [ ] College comparison
  - [ ] College predictor
- [ ] No hardcoded data in frontend
- [ ] All data comes from PostgreSQL via Prisma
- [ ] Database can be reproduced on another machine
- [ ] Setup documentation is clear

## Sign-Off

Date: ___________

✅ Database setup complete and verified  
✅ All features tested and working  
✅ Ready for development/deployment  

---

**Troubleshooting Help:**
- Neon Docs: https://neon.tech/docs
- Prisma Docs: https://prisma.io/docs
- Project Issues: Check console logs for specific errors

**Need to reset everything?**
```bash
npm run db:reset  # WARNING: Deletes all data
npm run db:seed   # Re-seed database
```
