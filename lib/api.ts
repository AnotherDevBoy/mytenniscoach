import axios, { AxiosResponse } from 'axios';
import { OpponentDTO, EventDTO, EventData, OpponentStatsDTO, StatsDTO } from './types';

export async function getEvents(): Promise<EventDTO[]> {
  const response = await axios.get(`api/events`);

  return response.data;
}

export async function createEvent(event: EventDTO): Promise<AxiosResponse> {
  return await axios.post(`api/events`, event);
}

export async function updateEvent(event: EventDTO): Promise<AxiosResponse> {
  return await axios.put(`api/events/${event.id}`, event);
}

export async function deleteEvent(eventId: string): Promise<AxiosResponse> {
  return await axios.delete(`api/events/${eventId}`);
}

export async function submitEventData(
  eventId: string,
  eventData: EventData
): Promise<AxiosResponse> {
  return await axios.post(`api/events/${eventId}/submitEventData`, eventData);
}

export async function createOpponent(name: string): Promise<OpponentDTO> {
  const opponentDTO = {
    name: name
  };

  const response = await axios.post(`api/opponents`, opponentDTO);

  return response.data;
}

export async function getOpponents(): Promise<OpponentDTO[]> {
  const response = await axios.get(`api/opponents`);

  const stats = await getOpponentsStats();

  return response.data;
}

export async function getOpponentsStats(): Promise<OpponentStatsDTO[]> {
  const response = await axios.get(`api/opponents/stats`);
  return response.data;
}

export async function deleteOpponents(
  opponentId: string
): Promise<AxiosResponse> {
  return await axios.delete(`api/opponents/${opponentId}`);
}

export async function getStats(): Promise<StatsDTO> {
  const response = await axios.get(`api/stats`);
  return response.data;
}
