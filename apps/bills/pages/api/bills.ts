import { promises as fs } from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import { Bill } from './../../lib/bill.model';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Bill[]>
) {
  if (req.method === 'GET') {
    const fileContents = await fs.readFile(
      path.join(process.cwd(), 'apps/bills', 'public/assets/bills.json'),
      'utf8'
    );

    res.status(200).json(JSON.parse(fileContents));
  } else if (req.method === 'POST') {
    const bill = JSON.parse(req.body);
    bill.id = Math.random().toString(36).substring(2, 9);
    res.status(200).json(bill);
  }
}
