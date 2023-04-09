import { EventType, ScheduleEventDTO } from '@/lib/types';
import { EventTypeDAL, ScheduleEventDAL } from '@/pages/api/lib/repository';

import { v4 as uuidv4 } from 'uuid';

export function toEventTypeDAL(eventType: EventType) {
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

export function toEventType(eventType: EventTypeDAL) {
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

export function toScheduleEventDAL(event: ScheduleEventDTO): ScheduleEventDAL {
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

export function toScheduleEvent(event: ScheduleEventDAL): ScheduleEventDTO {
  return {
    id: event.id,
    userId: event.userId,
    title: event.title,
    start: event.start,
    end: event.end,
    type: toEventType(event.type)
  };
}
