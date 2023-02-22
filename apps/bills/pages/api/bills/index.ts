import { faker } from '@faker-js/faker';
import { NextApiRequest, NextApiResponse } from 'next';
import { bills } from '../../../data/bills';
import { Bill } from '../../../lib/bill.model';

function getBills(res: NextApiResponse<Bill[]>) {
  res.status(200).json(bills);
}

function createBill(bill: Bill, res: NextApiResponse<Bill>) {
  bill.id = faker.datatype.uuid();
  bill.createdAt = new Date();
  bills.push(bill);
  res.status(201).json(bill);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Bill[] | Bill>
) {
  if (req.method === 'GET') {
    getBills(res);
  } else if (req.method === 'POST') {
    createBill(req.body, res);
  }
}
