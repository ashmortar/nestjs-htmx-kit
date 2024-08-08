import { PrismaClient } from '@prisma/client';
import * as colors from 'picocolors';
// import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {}
main()
  .then(async () => {
    await prisma.$disconnect();
    console.log(colors.green('Seed complete'));
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
