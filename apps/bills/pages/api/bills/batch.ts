// import { getServerSession } from 'next-auth/next';
// import { Prisma } from '@prisma/client';

// import { authOptions } from '../auth/[...nextauth]';
// import prisma from '../../../lib/prisma';

// POST /api/bill/batch
export default async function handle(req, res) {
  // if (req.method === 'POST') {
  //   const session = await getServerSession(req, res, authOptions);
  //   const author = await prisma.user.findUnique({
  //     where: { email: session?.user?.email },
  //     select: {
  //       id: true,
  //     },
  //   });
  //   const bills = req.body.map((bill) => ({
  //     ...bill,
  //     amount: new Prisma.Decimal(bill.amount),
  //     balance: bill.balance ? new Prisma.Decimal(bill.balance) : null,
  //     authorId: author?.id,
  //   }));
  //   const results = await prisma.$transaction(
  //     bills.map((bill) =>
  //       prisma.bill.upsert({
  //         where: { name: bill.name },
  //         update: bill,
  //         create: bill,
  //       })
  //     )
  //   );
  //   res.json(results);
  // } else {
  //   throw new Error(
  //     `The HTTP ${req.method} method is not supported at this route.`
  //   );
  // }
}
