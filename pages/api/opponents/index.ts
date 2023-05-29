import type { NextApiRequest, NextApiResponse } from 'next';
import { MyTennisCoachRepository } from '@/pages/api/lib/repository';
import { toOpponentDTO, toOpponentDAL } from '@/pages/api/convert';
import { getUser, authHandler } from '@/pages/api/lib/auth';
import { OpponentDTO } from '@/lib/types';
import { createLogger, logger } from '../lib/logger';
import { extractRequestId } from '../lib/headers';

const repository = new MyTennisCoachRepository();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  createLogger(extractRequestId(req));
  logger.info('Starting execution of /opponents');
  await authHandler(req, res);
  const user = getUser(req.cookies)!;

  switch (req.method) {
    case 'GET':
      const opponentsDAL = await repository.getOpponents(user);
      const opponentsDTO = opponentsDAL.map((e: any) => toOpponentDTO(e));

      return res.status(200).json(opponentsDTO);
    case 'POST':
      const opponentDTO = req.body as OpponentDTO;

      const opponentDAL = toOpponentDAL(opponentDTO, user);
      await repository.createOpponent(opponentDAL);
      return res.status(201).json(toOpponentDTO(opponentDAL));
    default:
      return res.status(404).json({ message: 'Not found' });
  }
}
