import type { NextApiRequest, NextApiResponse } from 'next';
import { MyTennisCoachRepository } from '@/pages/api/lib/repository';
import { toOpponentDTO, toOpponentDAL } from '@/pages/api/convert';
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

      const eventsDAL = await repository.getEvents(user);

      // Group events by opponent ID, sort by date from more recent to less recent
      // Return win-rate, forehand/backhand, Lastplayed, More

      return res.status(200).json({});
    default:
      return res.status(404).json({ message: 'Not found' });
  }
}
