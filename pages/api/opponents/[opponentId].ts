import type { NextApiRequest, NextApiResponse } from 'next';
import { MyTennisCoachRepository } from '@/pages/api/lib/repository';
import { authHandler } from '@/pages/api/lib/auth';
import { createLogger, logger } from '../lib/logger';
import { extractRequestId } from '../lib/headers';

const repository = new MyTennisCoachRepository();

function getOpponentId(req: NextApiRequest) {
  const url = req.url!!;
  const tokens = url.split('/');
  return tokens[tokens.length - 1];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  createLogger(extractRequestId(req));
  logger.info('Starting execution of /opponents/[id]');
  await authHandler(req, res);

  const opponentId = getOpponentId(req);

  switch (req.method) {
    case 'DELETE':
      await repository.deleteOpponent(opponentId);
      return res.status(200).end();
    default:
      return res.status(404).json({ message: 'Not found' });
  }
}
