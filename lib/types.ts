export enum EventType {
  Match = 'Match',
  Training = 'Training',
  Coaching = 'Coaching',
  Gym = 'Gym'
}

export type MatchSummary = {
  score: string;
  duration: string;
  win: boolean;
  rainLevel: number;
  windLevel: number;
  courtSpeed: number;
  surface: string;
};

export type MatchOpponentPerformance = {
  forehand: string;
  backhand: string;
  strength1: string;
  strength2: string;
  strength3: string;
  weakness1: string;
  weakness2: string;
  weakness3: string;
  changeForNextTime: string;
};

export type MatchPerformance = {
  technical: number;
  technicalNotes: string;
  tactical: number;
  tacticalNotes: string;
  physical: number;
  physicalNotes: string;
  mental: number;
  mentalNotes: string;
  lesson: string;
};

export type MatchEventData = EventData & {
  summary: MatchSummary;
  opponentPeformance: MatchOpponentPerformance;
  performance: MatchPerformance;
};

export type EventData = {};

export interface EventDTO {
  id: string;
  start: string;
  type: EventType;
  opponentId?: string;
  location?: string;
  data?: EventData;
}

export type OpponentDTO = {
  id: string;
  name: string;
};

export type MatchStats = {
  date: string;
  performance: MatchOpponentPerformance;
};

export type OpponentStatsDTO = {
  opponentId: string;
  opponentName: string;
  winRate?: string;
  forehand?: string;
  backhand?: string;
  matches?: MatchStats[];
};

export type StatsDTO = {
  winRate: string;
  nemesis: string;
  minutesOnCourt: Record<string, number>;
};

export function getEventTypeIndex(eventType: EventType): number {
  return Object.keys(EventType).indexOf(eventType);
}

export function getEventTypeFromIndex(index: number): EventType {
  return Object.keys(EventType)[index] as EventType;
}
