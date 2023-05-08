import { EventType, OpponentDTO, EventDTO, EventData } from '@/lib/types';
import {
  EventTypeDAL,
  OpponentDAL,
  EventDAL
} from '@/pages/api/lib/repository';

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

export function toEventDAL(event: EventDTO, userId: string): EventDAL {
  return {
    id: uuidv4(),
    user_id: userId,
    opponent_id: event.opponentId,
    start: event.start,
    end: event.end,
    type: toEventTypeDAL(event.type)
  };
}

export function toEventDTO(event: EventDAL): EventDTO {
  return {
    id: event.id,
    start: event.start,
    end: event.end,
    type: toEventType(event.type),
    opponentId: event.opponent_id,
    data: event.metadata
  };
}

export function toOpponentDTO(opponentDAL: OpponentDAL): OpponentDTO {
  return {
    id: opponentDAL.id,
    name: opponentDAL.name
  };
}

export function toOpponentDAL(
  opponentDTO: OpponentDTO,
  userId: string
): OpponentDAL {
  return {
    id: uuidv4(),
    user_id: userId,
    name: opponentDTO.name
  };
}
