import type { NextApiRequest, NextApiResponse } from 'next';
import { MyTennisCoachRepository } from '@/pages/api/lib/repository';
import { toEventDAL } from '@/pages/api/convert';
import { authHandler, getUser } from '@/pages/api/lib/auth';
import { EventDTO } from '@/lib/types';
import { extractEventId } from '@/utils/helpers';
import { createLogger, logger } from '../../lib/logger';
import { extractRequestId } from '../../lib/headers';

const repository = new MyTennisCoachRepository();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  createLogger(extractRequestId(req));
  logger.info('Starting execution of /events/[id]');
  await authHandler(req, res);
  const user = getUser(req.cookies)!;

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
