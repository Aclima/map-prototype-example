// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import amtrakData from '@/data/Amtrak_Routes.json';

// amtrak routes data source:
// https://geodata.bts.gov/datasets/usdot::amtrak-routes/about
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(amtrakData);
}
