export enum EventType {
  Match = 'Match',
  Training = 'Training',
  Coaching = 'Coaching',
  Gym = 'Gym'
}

export type EventDTO = {
  id: string;
  start: string;
  end: string;
  type: EventType;
  opponentId?: string;
};

export type OpponentDTO = {
  id: string;
  name: string;
};

export function getEventTypeIndex(eventType: EventType): number {
  return Object.keys(EventType).indexOf(eventType);
}

export function getEventTypeFromIndex(index: number): EventType {
  return Object.keys(EventType)[index] as EventType;
}
