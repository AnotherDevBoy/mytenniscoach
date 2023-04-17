import type { NextApiRequest, NextApiResponse } from 'next';
import { MyTennisCoachRepository } from '@/pages/api/lib/repository';
import { toOpponent, toOpponentDAL } from '@/pages/api/schedules/convert';
import { getUser, authHandler } from '@/pages/api/lib/auth';
import { OpponentDTO } from '@/lib/types';

const repository = new MyTennisCoachRepository();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  await authHandler(req, res);
  const user = getUser(req.cookies);

  switch (req.method) {
    case 'GET':
      const opponentsDAL = await repository.getOpponents(user);
      const opponentsDTO = opponentsDAL.map((e: any) => toOpponent(e));

      return res.status(200).json(opponentsDTO);
    case 'POST':
      const opponentDTO = req.body as OpponentDTO;

      await repository.createOpponent(toOpponentDAL(opponentDTO, user));
      return res.status(201).end();
    default:
      return res.status(404).json({ message: 'Not found' });
  }
}
