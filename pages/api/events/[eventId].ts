import type { NextApiRequest, NextApiResponse } from 'next';
import { MyTennisCoachRepository } from '@/pages/api/lib/repository';
import { toEventDAL } from '@/pages/api/convert';
import { authHandler, getUser } from '@/pages/api/lib/auth';
import { EventDTO } from '@/lib/types';

const repository = new MyTennisCoachRepository();

function extractEventId(req: NextApiRequest) {
  const url = req.url!!;
  const tokens = url.split('/');
  return tokens[tokens.length - 1];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  await authHandler(req, res);
  const user = getUser(req.cookies);

  if (!user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const eventId = extractEventId(req);

  switch (req.method) {
    case 'PUT':
      const eventToUpdate = req.body as EventDTO;

      await repository.updateEvent(toEventDAL(eventToUpdate, user));
      return res.status(200).end();
    case 'DELETE':
      await repository.deleteEvent(eventId);
      return res.status(200).end();
    default:
      return res.status(404).json({ message: 'Not found' });
  }
}
