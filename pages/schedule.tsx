import * as React from 'react';
import { useUser } from '@supabase/auth-helpers-react';
import Router from 'next/router';
import Menu from '@/components/Menu';
import { Scheduler } from '@aldabil/react-scheduler';
import { Box, Container } from '@mui/material';
import {
  EventActions,
  ProcessedEvent,
  ViewEvent
} from '@aldabil/react-scheduler/types';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { EventType, ScheduleEventDTO } from '@/lib/types';

const Schedule = () => {
  const user = useUser();

  React.useEffect(() => {
    if (!user) {
      Router.push('/signin');
    }
  }, [user]);

  const getScheduledEvents = async (
    _: ViewEvent
  ): Promise<ProcessedEvent[] | void> => {
    const response = await axios.get(`api/schedules`);

    return response.data.map((e: ScheduleEventDTO) => {
      return {
        event_id: e.id,
        title: e.title,
        start: new Date(e.start),
        end: new Date(e.end)
      } as ProcessedEvent;
    }) as ProcessedEvent[];
  };

  async function createSchedule(
    event: ProcessedEvent,
    action: EventActions
  ): Promise<ProcessedEvent> {
    const event_id = action === 'create' ? uuidv4() : event.event_id;

    const scheduleEvent: ScheduleEventDTO = {
      id: String(event_id),
      userId: user?.id!!,
      start: event.start.toISOString(),
      end: event.end.toISOString(),
      type: EventType.Match,
      title: event.title
    };

    const response =
      action === 'create'
        ? await axios.post(`api/schedules`, scheduleEvent)
        : await axios.put(`api/schedules/${event_id}`, scheduleEvent);

    return event;
  }

  async function deleteScheduledEvent(
    id: string | number
  ): Promise<string | number> {
    const response = await axios.delete(`api/schedules/${id}`);
    return id;
  }

  if (user) {
    return (
      <>
        <Box sx={{ display: 'flex' }}>
          <Menu firstSelectedItem={1} />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Scheduler
              view="month"
              onConfirm={async (event, action) =>
                await createSchedule(event, action)
              }
              onDelete={deleteScheduledEvent}
              getRemoteEvents={getScheduledEvents}
            />
          </Container>
        </Box>
      </>
    );
  }

  return <></>;
};

export default Schedule;
