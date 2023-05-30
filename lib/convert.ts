import { ProcessedEvent } from '@aldabil/react-scheduler/types';
import { EventType, EventDTO, OpponentDTO } from './types';

const colorsPerEventType = new Map<EventType, string>([
  [EventType.Match, '#ff9914'],
  [EventType.Training, '#f21b3f'],
  [EventType.Coaching, '#08bdbd'],
  [EventType.Gym, '#abff4f']
]);

function generateTitle(e: EventDTO, opponents: OpponentDTO[]) {
  if (e.type === EventType.Match && opponents) {
    const opponentName =
      opponents.find((o) => o.id === e.opponentId)?.name || '';
    return `${e.type} with ${opponentName}`;
  }

  return `${e.type}`;
}

export function toProcessedEvent(e: EventDTO, opponents: OpponentDTO[]) {
  const event = {
    event_id: e.id,
    start: new Date(e.start),
    end: new Date(e.end),
    type: e.type,
    color: colorsPerEventType.get(e.type),
    opponent: e.opponentId,
    title: generateTitle(e, opponents),
    editable: e.data ? false : true
  } as ProcessedEvent;

  return event;
}
