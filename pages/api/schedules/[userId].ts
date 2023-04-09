// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Schedule as ScheduleEvent } from '@mui/icons-material';
import type { NextApiRequest, NextApiResponse } from 'next';
import {
  EventTypeDAL,
  MyTennisCoachRepository,
  ScheduleEventDAL
} from '@/lib/repository';
import { v4 as uuidv4 } from 'uuid';

const repository = new MyTennisCoachRepository();

enum EventType {
  Match = 'Match',
  Training = 'Training',
  Coaching = 'Coaching',
  Gym = 'Gym'
}

type ScheduleEvent = {
  userId: string;
  start: string;
  end: string;
  type: EventType;
  title: string;
};

function toEventTypeDAL(eventType: EventType) {
  switch (eventType) {
    case EventType.Match:
      return EventTypeDAL.Match;
    case EventType.Training:
      return EventTypeDAL.Training;
    case EventType.Coaching:
      return EventTypeDAL.Coaching;
    case EventType.Gym:
      return EventTypeDAL.Gym;
    default:
      throw new Error('Unsupported type');
  }
}

function toEventType(eventType: EventTypeDAL) {
  switch (eventType) {
    case EventTypeDAL.Match:
      return EventType.Match;
    case EventTypeDAL.Training:
      return EventType.Training;
    case EventTypeDAL.Coaching:
      return EventType.Coaching;
    case EventTypeDAL.Gym:
      return EventType.Gym;
    default:
      throw new Error('Unsupported type');
  }
}

function toScheduleEventDAL(event: ScheduleEvent): ScheduleEventDAL {
  return {
    id: uuidv4(),
    userId: event.userId,
    title: event.title,
    start: event.start,
    end: event.end,
    type: toEventTypeDAL(event.type),
    created_at: undefined,
    deleted_at: undefined
  };
}

function toScheduleEvent(event: ScheduleEventDAL): ScheduleEvent {
  return {
    userId: event.userId,
    title: event.title,
    start: event.start,
    end: event.end,
    type: toEventType(event.type)
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const url = req.url!!;

  const tokens = url.split('/');

  const user = tokens[tokens.length - 1];

  if (req.method === 'GET') {
    const scheduleDAL = await repository.getSchedules(user);
    const schedule = scheduleDAL.map((e) => toScheduleEvent(e));

    return res.status(200).json(schedule);
  } else if (req.method === 'POST') {
    const event = req.body as ScheduleEvent;

    repository.createSchedule(toScheduleEventDAL(event));
    return res.status(201).end();
  }

  return res.status(404).json({ message: 'Not found' });
}
