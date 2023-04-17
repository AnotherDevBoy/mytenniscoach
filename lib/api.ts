import axios, { AxiosResponse } from 'axios';
import { OpponentDTO, ScheduleEventDTO } from './types';

export async function getScheduleEvents(): Promise<ScheduleEventDTO[]> {
  const response = await axios.get(`api/schedules`);

  return response.data;
}

export async function createScheduleEvent(
  event: ScheduleEventDTO
): Promise<AxiosResponse> {
  return await axios.post(`api/schedules`, event);
}

export async function updateScheduleEvent(
  event: ScheduleEventDTO
): Promise<AxiosResponse> {
  return await axios.put(`api/schedules/${event.id}`, event);
}

export async function deleteScheduleEvent(
  eventId: string
): Promise<AxiosResponse> {
  return await axios.delete(`api/schedules/${eventId}`);
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
  return response.data;
}

export async function deleteOpponents(
  opponentId: string
): Promise<AxiosResponse> {
  return await axios.delete(`api/opponents/${opponentId}`);
}
