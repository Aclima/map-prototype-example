// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import bcData from '@/data/blackcarbon_sampled.json';
import pm25Data from '@/data/pm_2.5_sampled.json';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const modality = req.query.modality as string;
    const h3Id = req.query.h3Id as string;
    const measurementData = modality === "pm_2.5" ? pm25Data[h3Id] : bcData[h3Id];
    res.status(200).json(measurementData);
}