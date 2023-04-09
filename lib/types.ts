export enum EventType {
  Match = 'Match',
  Training = 'Training',
  Coaching = 'Coaching',
  Gym = 'Gym'
}

export type ScheduleEventDTO = {
  id: string;
  userId: string;
  start: string;
  end: string;
  type: EventType;
  title: string;
};
