import type { NextApiRequest, NextApiResponse } from 'next';
import { MyTennisCoachRepository } from '@/pages/api/lib/repository';
import { toScheduleEventDAL } from '@/pages/api/schedules/convert';
import { getUser } from '@/pages/api/lib/auth';
import { ScheduleEventDTO } from '@/lib/types';

const repository = new MyTennisCoachRepository();

function getScheduleId(req: NextApiRequest) {
  const url = req.url!!;
  const tokens = url.split('/');
  return tokens[tokens.length - 1];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const user = getUser(req.cookies);

  if (!user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const scheduleId = getScheduleId(req);

  switch (req.method) {
    case 'PUT':
      const eventToUpdate = req.body as ScheduleEventDTO;

      await repository.upsertScheduleEvent(toScheduleEventDAL(eventToUpdate));
      return res.status(200).end();
    case 'DELETE':
      await repository.deleteScheduleEvent(scheduleId);
      return res.status(200).end();
    default:
      return res.status(404).json({ message: 'Not found' });
  }
}
