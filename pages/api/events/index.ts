import type { NextApiRequest, NextApiResponse } from 'next';
import { MyTennisCoachRepository } from '@/pages/api/lib/repository';
import { toEventDTO, toEventDAL } from '@/pages/api/convert';
import { getUser, authHandler } from '@/pages/api/lib/auth';
import { EventDTO } from '@/lib/types';
import { createLogger, logger } from '../lib/logger';
import { extractRequestId } from '../lib/headers';

const repository = new MyTennisCoachRepository();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  createLogger(extractRequestId(req));
  logger.info('Starting execution of /events');
  await authHandler(req, res);
  const user = getUser(req.cookies)!;

  switch (req.method) {
    case 'GET':
      const eventsDAL = await repository.getEvents(user);
      const eventsDTO = eventsDAL.map((e: any) => toEventDTO(e));

      return res.status(200).json(eventsDTO);
    case 'POST':
      const event = req.body as EventDTO;

      await repository.createEvent(toEventDAL(event, user));
      return res.status(201).end();
    default:
      return res.status(404).json({ message: 'Not found' });
  }
}
