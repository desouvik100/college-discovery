import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = "dev@example.com";
  const plainPassword = "DevelopmentPassword123!";
  const name = "Development User";

  console.log("Checking development seed user...");

  const existing = await prisma.user.findUnique({
    where: { email },
  });

  if (existing) {
    console.log(`Development user already exists: ${email}`);
    return;
  }

  const passwordHash = await bcrypt.hash(plainPassword, 10);

  const user = await prisma.user.create({
    data: {
      email,
      name,
      passwordHash,
    },
  });

  console.log("Created local development seed account:");
  console.log(`Email: ${user.email}`);
  console.log(`Password: ${plainPassword}`);
  console.log("NOTE: This account is strictly for local testing. Never use in production.");
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
