import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  try {
    // Check connection
    await prisma.$connect();
    console.log("✅ Database connection successful!\n");

    const [
      collegesCount,
      coursesCount,
      reviewsCount,
      placementStatsCount,
      examsCount,
      admissionCutoffsCount,
    ] = await Promise.all([
      prisma.college.count(),
      prisma.course.count(),
      prisma.review.count(),
      prisma.placementStats.count(),
      prisma.exam.count(),
      prisma.admissionCutoff.count(),
    ]);

    console.log("📊 Database Statistics:");
    console.log(`   Colleges: ${collegesCount}`);
    console.log(`   Courses: ${coursesCount}`);
    console.log(`   Reviews: ${reviewsCount}`);
    console.log(`   Placement Stats: ${placementStatsCount}`);
    console.log(`   Exams: ${examsCount}`);
    console.log(`   Admission Cutoffs: ${admissionCutoffsCount}`);

    console.log("\n✅ Verification complete! Your database is ready.");
  } catch (error) {
    console.error("❌ Database verification failed:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
