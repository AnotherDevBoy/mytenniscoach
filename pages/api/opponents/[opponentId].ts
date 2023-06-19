import type { NextApiRequest, NextApiResponse } from 'next';
import { MyTennisCoachRepository } from '@/pages/api/lib/repository';
import { authHandler, getUser } from '@/pages/api/lib/auth';
import { createLogger, logger } from '../lib/logger';
import { extractRequestId } from '../lib/headers';
import { OpponentDTO } from '@/lib/types';
import { toOpponentDAL, toOpponentDTO } from '../convert';

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

  const user = getUser(req.cookies)!;

  const opponentId = getOpponentId(req);

  switch (req.method) {
    case 'PATCH':
      const opponentDTO = req.body as OpponentDTO;

      if (opponentDTO.id !== opponentId) {
        return res.status(401).json({message: `Not allowed to modify user ${opponentId}`});
      }

      const opponentDAL = toOpponentDAL(opponentDTO, user);
      await repository.updateOpponent(opponentDAL);
      return res.status(201).json(toOpponentDTO(opponentDAL));
    case 'DELETE':
      await repository.deleteOpponent(opponentId);
      return res.status(200).end();
    default:
      return res.status(404).json({ message: 'Not found' });
  }
}
