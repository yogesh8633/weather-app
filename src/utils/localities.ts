// pages/api/localities.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import { readPdfData, Locality } from './readPdf';

interface Data {
  localities?: Locality[];
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const localities = await readPdfData();
    res.status(200).json({ localities });
  } catch (error) {
    res.status(500).json({ error: 'Failed to read PDF' });
  }
}
