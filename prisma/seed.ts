import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const ADMIN_USERNAME = 'admin';
  const ADMIN_PASSWORD = 'heslo123';
  const SALT_ROUNDS = 10;

  // Check if admin user already exists
  const existingAdmin = await prisma.user.findUnique({
    where: { username: ADMIN_USERNAME },
  });

  if (existingAdmin) {
    console.log('Admin user already exists');
    return;
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, SALT_ROUNDS);

  // Create admin user
  const admin = await prisma.user.create({
    data: {
      username: ADMIN_USERNAME,
      password: hashedPassword,
    },
  });

  console.log('Admin user created:', admin.username);
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
