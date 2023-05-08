import type { NextApiRequest, NextApiResponse } from 'next';
import {
  EventDAL,
  EventTypeDAL,
  MyTennisCoachRepository
} from '@/pages/api/lib/repository';
import { getUser, authHandler } from '@/pages/api/lib/auth';
import { EventDTO, EventData, MatchEventData } from '@/lib/types';
import { extractEventId } from '@/utils/helpers';

const repository = new MyTennisCoachRepository();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  await authHandler(req, res);
  const user = getUser(req.cookies);

  switch (req.method) {
    case 'POST':
      const eventData = req.body as EventData;

      const eventId = extractEventId(req);

      const event: EventDAL | null = await repository.getEvent(user, eventId);

      if (!event) {
        return res.status(404).json({ message: 'Not found' });
      }

      switch (event.type) {
        case EventTypeDAL.Match:
          const matchData = eventData as MatchEventData;

          // TODO: Validate the EventData contains what we expect
          event.metadata = matchData;
          await repository.updateEvent(event);
          return res.status(200).end();
      }

      return res.status(500).json({ message: 'Unsupported event type' });
    default:
      return res.status(404).json({ message: 'Not found' });
  }
}
