import { NextApiRequest, NextApiResponse } from 'next';
import { Bill } from '../../../lib/bill.model';
import { bills } from '../data/bills';

function updateBill(bill: Bill, res: NextApiResponse<Bill>) {
  bill.updatedAt = new Date();
  bills[bills.findIndex((b) => b.id === bill.id)] = bill;
  res.status(200).json(bill);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Bill>
) {
  if (req.method === 'PUT') {
    updateBill(req.body, res);
  }
}
