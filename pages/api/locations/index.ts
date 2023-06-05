import type { NextApiRequest, NextApiResponse } from 'next';
import { readFile } from 'fs/promises';
import path from 'path';
import { authHandler } from '@/pages/api/lib/auth';
import { createLogger, logger } from '../lib/logger';
import { extractRequestId } from '../lib/headers';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  createLogger(extractRequestId(req));
  logger.info('Starting execution of /locations');
  await authHandler(req, res);

  switch (req.method) {
    case 'GET':
      const clubsPath = path.resolve('./public/clubs/IRL/clubs.json');

      const clubs = JSON.parse(await readFile(clubsPath, 'utf8'));

      return res.status(200).json(clubs);
    default:
      return res.status(404).json({ message: 'Not found' });
  }
}
