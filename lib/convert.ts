import { ProcessedEvent } from '@aldabil/react-scheduler/types';
import { EventType, ScheduleEventDTO } from './types';

const colorsPerEventType = new Map<EventType, string>([
  [EventType.Match, '#ff9914'],
  [EventType.Training, '#f21b3f'],
  [EventType.Coaching, '#08bdbd'],
  [EventType.Gym, '#abff4f']
]);

export function toProcessedEvent(e: ScheduleEventDTO) {
  return {
    event_id: e.id,
    title: e.title,
    start: new Date(e.start),
    end: new Date(e.end),
    type: e.type,
    color: colorsPerEventType.get(e.type)
  } as ProcessedEvent;
}
