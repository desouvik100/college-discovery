# Database Schema Documentation

## Entity Relationship Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│                         COLLEGE                                 │
│  ┌───────────────────────────────────────────────────────┐    │
│  │ id               String (UUID) PK                      │    │
│  │ name             String ●                              │    │
│  │ location         String                                │    │
│  │ state            String ●                              │    │
│  │ city             String                                │    │
│  │ establishedYear  Int                                   │    │
│  │ collegeType      Enum (GOVERNMENT, PRIVATE, DEEMED)   │    │
│  │ rating           Decimal(2,1) ●                        │    │
│  │ totalFees        Int ●                                 │    │
│  │ createdAt        DateTime                              │    │
│  │ updatedAt        DateTime                              │    │
│  └───────────────────────────────────────────────────────┘    │
│                            │                                    │
└────────────────────────────┼────────────────────────────────────┘
                             │
                ┌────────────┼────────────┬─────────────────┐
                │            │            │                 │
                ▼            ▼            ▼                 ▼
        ┌───────────┐ ┌─────────────┐ ┌────────┐ ┌────────────────┐
        │  COURSE   │ │ PLACEMENT   │ │ REVIEW │ │ ADMISSION      │
        │           │ │   STATS     │ │        │ │  CUTOFF        │
        └───────────┘ └─────────────┘ └────────┘ └────────────────┘
             │                                            │
             │                                            │
             └──────────────┬─────────────────────────────┘
                            │
                            ▼
                      ┌──────────┐
                      │   EXAM   │
                      └──────────┘
```

## Detailed Schema

### 1. College

**Purpose:** Core entity storing college information. Used for listing, search, filtering, detail pages, and comparison.

**Fields:**
| Field | Type | Constraints | Indexed | Description |
|-------|------|-------------|---------|-------------|
| id | UUID | PRIMARY KEY | ✓ | Unique identifier |
| name | String | NOT NULL | ✓ | College name (searchable) |
| location | String | NOT NULL | - | Full location string |
| state | String | NOT NULL | ✓ | State (for filtering) |
| city | String | NOT NULL | - | City name |
| establishedYear | Integer | NOT NULL | - | Year founded |
| collegeType | Enum | NOT NULL | - | GOVERNMENT, PRIVATE, DEEMED |
| rating | Decimal(2,1) | NOT NULL | ✓ | Rating 0.0-5.0 (for sorting) |
| totalFees | Integer | NOT NULL | ✓ | Annual fees in INR (for filtering) |
| createdAt | DateTime | DEFAULT now() | - | Record creation time |
| updatedAt | DateTime | AUTO UPDATE | - | Last update time |

**Relationships:**
- Has many Courses (1:N)
- Has many PlacementStats (1:N)
- Has many Reviews (1:N)
- Has many AdmissionCutoffs (1:N)

**Indexes:**
- `name` - For search queries
- `state` - For filtering by location
- `rating` - For sorting by rating
- `totalFees` - For fee range filters

---

### 2. Course

**Purpose:** Programs offered by colleges. Used in detail pages and cutoff calculations.

**Fields:**
| Field | Type | Constraints | Indexed | Description |
|-------|------|-------------|---------|-------------|
| id | UUID | PRIMARY KEY | ✓ | Unique identifier |
| collegeId | UUID | FOREIGN KEY | ✓ | Links to College |
| name | String | NOT NULL | - | Course name (e.g., "B.Tech CSE") |
| duration | Integer | NOT NULL | - | Duration in years |
| fees | Integer | NOT NULL | - | Course fees (total program) |
| seats | Integer | NOT NULL | - | Available seats |
| eligibility | String | NOT NULL | - | Eligibility criteria |

**Relationships:**
- Belongs to College (N:1)
- Has many AdmissionCutoffs (1:N)

**Cascade:** Deletes when College is deleted

---

### 3. PlacementStats

**Purpose:** Yearly placement records. Used in detail pages and comparison feature.

**Fields:**
| Field | Type | Constraints | Indexed | Description |
|-------|------|-------------|---------|-------------|
| id | UUID | PRIMARY KEY | ✓ | Unique identifier |
| collegeId | UUID | FOREIGN KEY | ✓ | Links to College |
| year | Integer | NOT NULL | ✓ | Placement year |
| averagePackage | Integer | NOT NULL | - | Average package in INR |
| highestPackage | Integer | NOT NULL | - | Highest package in INR |
| medianPackage | Integer | NOT NULL | - | Median package in INR |
| placementRate | Decimal(5,2) | NOT NULL | - | Placement rate % |
| topRecruiters | String[] | NOT NULL | - | Array of company names |

**Relationships:**
- Belongs to College (N:1)

**Cascade:** Deletes when College is deleted

**Indexes:**
- `year` - For sorting by year

---

### 4. Review

**Purpose:** Student reviews. Provides social proof and user-generated content.

**Fields:**
| Field | Type | Constraints | Indexed | Description |
|-------|------|-------------|---------|-------------|
| id | UUID | PRIMARY KEY | ✓ | Unique identifier |
| collegeId | UUID | FOREIGN KEY | ✓ | Links to College |
| rating | Integer | NOT NULL | - | Rating 1-5 |
| title | String | NOT NULL | - | Review title |
| content | Text | NOT NULL | - | Review content |
| author | String | NOT NULL | - | Student name |
| courseStudied | String | NOT NULL | - | Course name |
| graduationYear | Integer | NOT NULL | - | Graduation year |
| createdAt | DateTime | DEFAULT now() | - | Review date |

**Relationships:**
- Belongs to College (N:1)

**Cascade:** Deletes when College is deleted

---

### 5. Exam

**Purpose:** Reference data for entrance exams. Used in predictor form and cutoff filtering.

**Fields:**
| Field | Type | Constraints | Indexed | Description |
|-------|------|-------------|---------|-------------|
| id | UUID | PRIMARY KEY | ✓ | Unique identifier |
| name | String | NOT NULL | - | Exam name (e.g., "JEE Main") |
| code | String | UNIQUE, NOT NULL | - | Exam code (e.g., "JEE_MAIN") |
| description | String | NOT NULL | - | Exam description |

**Relationships:**
- Has many AdmissionCutoffs (1:N)

**Note:** This is reference data, typically 3-5 exams total.

---

### 6. AdmissionCutoff

**Purpose:** Historical cutoff data. **Critical for predictor feature.**

**Fields:**
| Field | Type | Constraints | Indexed | Description |
|-------|------|-------------|---------|-------------|
| id | UUID | PRIMARY KEY | ✓ | Unique identifier |
| collegeId | UUID | FOREIGN KEY | ✓ | Links to College |
| courseId | UUID | FOREIGN KEY | ✓ | Links to Course |
| examId | UUID | FOREIGN KEY | ✓ | Links to Exam |
| year | Integer | NOT NULL | - | Cutoff year |
| openingRank | Integer | NOT NULL | ✓ | Opening rank |
| closingRank | Integer | NOT NULL | ✓ | Closing rank |
| category | Enum | NOT NULL | ✓ | GENERAL, OBC, SC, ST, EWS |

**Relationships:**
- Belongs to College (N:1)
- Belongs to Course (N:1)
- Belongs to Exam (N:1)

**Cascade:** Deletes when College, Course, or Exam is deleted

**Indexes:**
- `examId` - For filtering by exam
- `openingRank` - For predictor queries
- `closingRank` - For predictor queries
- `category` - For category filtering

---

## Data Flow Examples

### 1. College Listing Page
```
Query: GET /api/colleges?state=Delhi&minRating=4

Database Flow:
┌─────────────────────────────────────┐
│ WHERE state = 'Delhi'               │
│   AND rating >= 4                   │
│ ORDER BY rating DESC                │
│ LIMIT 12 OFFSET 0                   │
└─────────────────────────────────────┘
        │
        ▼
Uses indexes on: state, rating
Returns: id, name, location, rating, totalFees, collegeType
```

### 2. College Detail Page
```
Query: GET /api/colleges/:id

Database Flow:
┌─────────────────────────────────────┐
│ SELECT College WHERE id = :id       │
│ INCLUDE:                            │
│   - courses[]                       │
│   - placementStats[] (last 3 years)│
│   - reviews[] (latest 10)           │
└─────────────────────────────────────┘
        │
        ▼
Single optimized query with relations
Returns: Full college object with nested data
```

### 3. College Comparison
```
Query: GET /api/colleges/compare?ids=id1,id2,id3

Database Flow:
┌─────────────────────────────────────┐
│ SELECT Colleges WHERE id IN [...]   │
│ INCLUDE:                            │
│   - placementStats[0] (latest)      │
└─────────────────────────────────────┘
        │
        ▼
Returns: Array of colleges with placement stats
```

### 4. College Predictor (Most Complex)
```
Query: POST /api/predict
Body: { examCode: "JEE_MAIN", rank: 5000, category: "GENERAL" }

Database Flow:
┌─────────────────────────────────────────────────┐
│ 1. SELECT Exam WHERE code = "JEE_MAIN"          │
│    → Get examId                                 │
│                                                 │
│ 2. SELECT AdmissionCutoff WHERE:                │
│    - examId = :examId                           │
│    - category = "GENERAL"                       │
│    - 5000 <= closingRank * 1.2                  │
│    INCLUDE:                                     │
│      - college (id, name, location, rating)     │
│      - course (name, fees)                      │
│    ORDER BY closingRank ASC                     │
└─────────────────────────────────────────────────┘
        │
        ▼
Algorithm calculates probability:
- HIGH: rank <= closingRank
- MODERATE: rank <= closingRank * 1.1
- LOW: rank <= closingRank * 1.2

Sort by probability, then rating
Returns: Top 20 predictions with explanations
```

## Query Performance

### Optimized Queries

✅ **College Search**
- Uses index on `name` (case-insensitive)
- Fast even with thousands of colleges

✅ **Filtering**
- Indexes on `state`, `rating`, `totalFees`
- Combined WHERE clauses use indexes

✅ **Predictor**
- Indexes on `examId`, `closingRank`, `category`
- Filters before joining (reduces join size)

✅ **Pagination**
- `LIMIT` and `OFFSET` prevent loading all records
- Page size capped at 50

### Expected Query Times (with indexes)

| Operation | Records | Time |
|-----------|---------|------|
| College search | 20 | < 10ms |
| College detail | 1 + relations | < 20ms |
| College compare | 3 + relations | < 30ms |
| Predictor | 200+ cutoffs | < 50ms |

## Seed Data Statistics

When you run `npm run db:seed`:

```
Colleges:           20
├─ IITs:            5 (Delhi, Bombay, Madras, Kharagpur, Kanpur)
├─ NITs:            3 (Trichy, Karnataka, Rourkela)
├─ BITS:            1 (Pilani)
├─ Private/Deemed:  11 (VIT, Manipal, SRM, etc.)

Courses:            60 (3 per college)
├─ CSE:             20
├─ ECE:             20
└─ Mechanical:      20

PlacementStats:     60 (3 years per college)
├─ Years:           2024, 2023, 2022
└─ Per record:      6 metrics + recruiters

Reviews:            60 (3 per college)
├─ Ratings:         4-5 stars (realistic)
└─ Authors:         With course & year

Exams:              3
├─ JEE Main
├─ JEE Advanced
└─ NEET

AdmissionCutoffs:   200+ (varies)
├─ Categories:      5 (GENERAL, OBC, SC, ST, EWS)
├─ Per college:     2 courses × 5 categories = 10
└─ Total:           20 colleges × 10 = 200
```

## Schema Evolution

### Adding New Fields

1. Edit `prisma/schema.prisma`
2. Generate client: `npm run db:generate`
3. Push changes: `npm run db:push`
4. Update seed if needed

### Adding New Models

Example: Adding "Faculty" model

```prisma
model Faculty {
  id          String   @id @default(uuid())
  collegeId   String
  name        String
  designation String
  department  String
  
  college     College  @relation(fields: [collegeId], references: [id])
  
  @@index([collegeId])
}
```

## Security Considerations

✅ **No SQL Injection** - Prisma uses parameterized queries  
✅ **Type Safety** - TypeScript prevents type errors  
✅ **Validated Input** - Zod schemas at API boundary  
✅ **Environment Variables** - Credentials not in code  
✅ **SSL Required** - Neon connections use SSL  

## Backup Strategy

**Neon Automatic Backups:**
- Point-in-time restore
- 7-day retention (free tier)
- 30-day retention (paid tiers)

**Manual Backup:**
```bash
# Export schema
npx prisma db pull

# Export data (custom script needed)
npx ts-node scripts/export-data.ts
```

## Monitoring

Track these metrics in production:
- Query response times
- Connection pool usage
- Database size growth
- Slow query log
- Error rates

Neon dashboard provides built-in monitoring.

---

## Questions?

- **Prisma Docs:** [prisma.io/docs](https://www.prisma.io/docs)
- **Neon Docs:** [neon.tech/docs](https://neon.tech/docs)
- **Schema Reference:** See `prisma/schema.prisma`
