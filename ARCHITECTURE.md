# Architecture Documentation

## Project Overview

This is a full-stack college discovery platform built with Next.js 14, demonstrating professional software engineering practices suitable for production applications.

## Technology Choices & Rationale

### Frontend: Next.js 14 with App Router

**Why Next.js?**
- Server-side rendering for better SEO and initial load performance
- App Router provides better separation of server and client components
- Built-in API routes eliminate need for separate backend server
- Excellent TypeScript support
- Optimized image loading and routing

**Why App Router over Pages Router?**
- Better performance with server components by default
- More intuitive file-based routing
- Improved data fetching patterns
- Better streaming and suspense support

### Styling: TailwindCSS

**Why Tailwind?**
- Utility-first approach enables rapid development
- Consistent design system without CSS sprawl
- Excellent tree-shaking for production builds
- Easy to customize and extend
- No runtime CSS-in-JS overhead

**Design System Approach:**
- Created reusable component classes in `globals.css`
- Consistent spacing, typography, and color scales
- Minimal use of shadows and effects (professional, not flashy)
- Focus on information hierarchy over decoration

### Database: PostgreSQL + Prisma

**Why PostgreSQL?**
- Robust relational database for structured data
- Excellent support for complex queries
- ACID compliance for data integrity
- Handles relationships between colleges, courses, cutoffs efficiently

**Why Prisma?**
- Type-safe database client
- Intuitive schema definition
- Excellent TypeScript integration
- Built-in migration system
- Auto-generated types match database schema

### Validation: Zod

**Why Zod?**
- TypeScript-first schema validation
- Compose and reuse validation logic
- Excellent error messages
- Minimal bundle size
- Integrates well with TypeScript inference

## Project Structure

```
college_discovery/
├── app/                      # Next.js App Router
│   ├── api/                 # Backend API routes
│   ├── colleges/[id]/       # Dynamic routes
│   ├── compare/             # Static routes
│   └── predictor/           
├── components/              # React components
│   ├── layout/             # App shell components
│   ├── colleges/           # Feature-specific components
│   ├── comparison/         
│   ├── predictor/          
│   └── ui/                 # Reusable UI primitives
├── lib/                    # Shared utilities
│   ├── db.ts              # Database client singleton
│   ├── types.ts           # Shared TypeScript types
│   └── validation.ts      # Zod schemas
├── services/              # Business logic layer
│   ├── collegeService.ts  # College-related operations
│   └── predictorService.ts # Prediction algorithm
└── prisma/               # Database schema and seeds
```

## Architecture Patterns

### Layered Architecture

**Presentation Layer (Components)**
- React components for UI
- Client components only when interactivity needed
- Server components by default for performance

**API Layer (app/api/)**
- RESTful endpoints
- Input validation using Zod
- Consistent error handling
- Proper HTTP status codes

**Service Layer (services/)**
- Business logic separated from API routes
- Reusable across different endpoints
- Easier to test and maintain

**Data Layer (Prisma)**
- Database access centralized
- Type-safe queries
- Connection pooling handled automatically

### Design Decisions

#### Server Components vs Client Components

**Server Components Used For:**
- College listing page (no interactivity needed)
- College detail page (static content)
- Initial page loads

**Client Components Used For:**
- Search and filter interactions
- Form submissions
- Dynamic comparison selector
- Predictor form

**Benefit:** Reduced JavaScript bundle size, faster initial page load

#### API Design

**RESTful Principles:**
- `GET /api/colleges` - List with query parameters
- `GET /api/colleges/:id` - Single resource
- `GET /api/colleges/compare` - Specialized read operation
- `POST /api/predict` - Action that generates results

**Query Parameter Design:**
- Simple string/number parameters
- Pagination built-in
- Filtering and sorting supported
- Validation at API boundary

#### Database Schema Design

**Normalization:**
- Separate tables for related entities
- Foreign keys maintain referential integrity
- Indexes on frequently queried fields

**Key Relationships:**
- College → Courses (1:N)
- College → PlacementStats (1:N)
- College → Reviews (1:N)
- AdmissionCutoff → College, Course, Exam (N:1)

**Performance Considerations:**
- Indexes on search/filter fields (name, state, rating, fees)
- Indexes on cutoff ranks for predictor queries
- Pagination to limit query size

## Feature Implementation Details

### 1. College Listing

**Approach:**
- Server-side filtering and pagination
- Search implemented using Prisma's `contains` with case-insensitive mode
- Filters applied via Prisma where clauses
- Sorted results based on query parameters

**Performance:**
- Only selected fields returned (not full objects)
- Pagination prevents loading entire dataset
- Database indexes speed up queries

### 2. College Detail Page

**Approach:**
- Single database query with relations using Prisma `include`
- Server component for automatic caching
- Related data (courses, placements, reviews) loaded together

**UX Considerations:**
- Breadcrumb navigation
- Clear information hierarchy
- Placement stats prominently displayed
- Reviews with context (author, course, year)

### 3. Comparison

**Approach:**
- Client-side interaction for selecting colleges
- API fetches multiple colleges in single request
- Visual indicators for best values (green highlighting)
- Responsive table design

**Implementation Details:**
- URL state management (college IDs in query params)
- Shareable comparison links
- Maximum 3 colleges to keep comparison useful

### 4. Predictor

**Algorithm:**
- Deterministic, not AI/ML (intentional)
- Based on historical cutoff data
- Transparent probability calculation
- Clear explanations provided

**Categories:**
- **HIGH**: Rank ≤ closing rank (safe)
- **MODERATE**: Rank ≤ closing rank × 1.1 (borderline)
- **LOW**: Rank ≤ closing rank × 1.2 (reach)

**Sorting:**
- Probability category first (HIGH → MODERATE → LOW)
- Then by college rating (higher is better)
- Returns top 20 results

## Security Considerations

**Input Validation:**
- All API inputs validated with Zod
- SQL injection prevented by Prisma (parameterized queries)
- XSS prevented by React's default escaping

**Environment Variables:**
- Database credentials in `.env` (not committed)
- `.env.example` provided for reference
- Client-side env vars prefixed with `NEXT_PUBLIC_`

**Error Handling:**
- Database errors not exposed to clients
- Generic error messages in production
- Detailed logs for debugging (server-side only)

## Performance Optimizations

**Server Components:**
- Reduces client JavaScript bundle
- Automatic caching of page renders

**Image Optimization:**
- Next.js Image component (if images were used)
- Automatic resizing and format conversion

**Database:**
- Connection pooling (Prisma handles this)
- Selective field loading (only needed fields)
- Indexes on frequently queried columns

**Bundle Size:**
- Minimal dependencies
- Tree-shaking enabled (Tailwind, libraries)
- Code splitting via Next.js routing

## Scalability Considerations

**Database:**
- PostgreSQL can handle millions of records
- Indexes ensure query performance
- Can add read replicas if needed

**API:**
- Stateless design enables horizontal scaling
- Next.js can deploy to edge functions
- Pagination prevents large result sets

**Frontend:**
- Static generation where possible
- Server components reduce client load
- CDN-friendly architecture (Vercel)

## Testing Strategy (Not Implemented)

**Recommended Testing Approach:**

**Unit Tests:**
- Service layer functions
- Validation schemas
- Utility functions

**Integration Tests:**
- API routes
- Database queries
- Business logic flows

**E2E Tests:**
- Critical user journeys
- Search → Detail → Compare flow
- Predictor workflow

## Deployment Architecture

**Recommended Setup:**

**Frontend & API:**
- Vercel (Next.js optimized hosting)
- Automatic deployments from Git
- Edge function support

**Database:**
- Neon (serverless PostgreSQL)
- Automatic scaling
- Connection pooling

**CI/CD:**
- GitHub Actions for automated testing
- Preview deployments for PRs
- Production deployment on merge

## Future Enhancements

**If This Were a Real Product:**

1. **Authentication:**
   - User accounts
   - Saved colleges/comparisons
   - Application tracking

2. **Enhanced Search:**
   - Elasticsearch for advanced search
   - Fuzzy matching
   - Search suggestions

3. **Analytics:**
   - Track popular colleges
   - User behavior insights
   - A/B testing

4. **Admin Dashboard:**
   - Manage college data
   - Update cutoffs
   - Moderate reviews

5. **API Rate Limiting:**
   - Prevent abuse
   - Usage analytics
   - Tiered access

6. **Caching Layer:**
   - Redis for frequently accessed data
   - API response caching
   - Session management

## Code Quality Standards

**TypeScript:**
- Strict mode enabled
- Minimal use of `any`
- Proper type definitions for all functions

**Component Design:**
- Single responsibility principle
- Props interfaces defined
- Reusable where actually reused

**Naming Conventions:**
- PascalCase for components
- camelCase for functions/variables
- Descriptive names (no `data2`, `temp`)

**File Organization:**
- Features grouped together
- Shared utilities in `lib/`
- No circular dependencies

## Why This Architecture?

This architecture prioritizes:

1. **Simplicity** - Easy to understand and maintain
2. **Performance** - Server components, efficient queries
3. **Type Safety** - TypeScript + Prisma + Zod
4. **Scalability** - Layered design, stateless API
5. **Developer Experience** - Clear structure, good tooling
6. **Professional Quality** - Production-ready patterns

The result is a maintainable, performant application that demonstrates real-world engineering skills rather than over-engineered complexity.
