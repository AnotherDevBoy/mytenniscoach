import axios, { AxiosResponse } from 'axios';
import {
  OpponentDTO,
  EventDTO,
  EventData,
  OpponentStatsDTO,
  StatsDTO
} from './types';
import { v4 as uuidv4 } from 'uuid';

export async function getEvents(): Promise<EventDTO[]> {
  const requestId = uuidv4();

  const response = await axios.get(`api/events`, {
    headers: { 'X-Request-ID': requestId }
  });

  handleResponseErrors(requestId, response);

  return response.data;
}

export async function createEvent(event: EventDTO): Promise<AxiosResponse> {
  const requestId = uuidv4();

  const response = await axios.post(`api/events`, event, {
    headers: { 'X-Request-ID': requestId }
  });

  handleResponseErrors(requestId, response);

  return response;
}

export async function updateEvent(event: EventDTO): Promise<AxiosResponse> {
  const requestId = uuidv4();

  const response = await axios.put(`api/events/${event.id}`, event, {
    headers: { 'X-Request-ID': requestId }
  });

  handleResponseErrors(requestId, response);

  return response;
}

export async function deleteEvent(eventId: string): Promise<AxiosResponse> {
  const requestId = uuidv4();

  const response = await axios.delete(`api/events/${eventId}`, {
    headers: { 'X-Request-ID': requestId }
  });

  handleResponseErrors(requestId, response);

  return response;
}

export async function submitEventData(
  eventId: string,
  eventData: EventData
): Promise<AxiosResponse> {
  const requestId = uuidv4();

  const response = await axios.post(
    `api/events/${eventId}/submitEventData`,
    eventData,
    {
      headers: { 'X-Request-ID': requestId }
    }
  );

  handleResponseErrors(requestId, response);

  return response;
}

export async function createOpponent(name: string): Promise<OpponentDTO> {
  const requestId = uuidv4();

  const opponentDTO = {
    name: name
  };

  const response = await axios.post(`api/opponents`, opponentDTO, {
    headers: { 'X-Request-ID': requestId }
  });

  return response.data;
}

export async function getOpponents(): Promise<OpponentDTO[]> {
  const requestId = uuidv4();

  const response = await axios.get(`api/opponents`, {
    headers: { 'X-Request-ID': requestId }
  });

  handleResponseErrors(requestId, response);

  return response.data;
}

export async function getOpponentsStats(): Promise<OpponentStatsDTO[]> {
  const requestId = uuidv4();

  const response = await axios.get(`api/opponents/stats`, {
    headers: { 'X-Request-ID': requestId }
  });

  handleResponseErrors(requestId, response);

  return response.data;
}

export async function deleteOpponents(
  opponentId: string
): Promise<AxiosResponse> {
  const requestId = uuidv4();

  const response = await axios.delete(`api/opponents/${opponentId}`, {
    headers: { 'X-Request-ID': requestId }
  });

  handleResponseErrors(requestId, response);

  return response;
}

export async function getStats(): Promise<StatsDTO> {
  const requestId = uuidv4();

  const response = await axios.get(`api/stats`, {
    headers: { 'X-Request-ID': requestId },
    validateStatus: (status) => true
  });

  handleResponseErrors(requestId, response);

  return response.data;
}

export async function getLocations(): Promise<string[]> {
  const requestId = uuidv4();

  const response = await axios.get(`api/locations`, {
    headers: { 'X-Request-ID': requestId }
  });

  handleResponseErrors(requestId, response);

  return response.data;
}

function handleResponseErrors(requestId: string, response: AxiosResponse) {
  if (response.status >= 400) {
    throw new Error(
      `An error occurred. Please reach out for help. Request ID ${requestId}`
    );
  }
}
