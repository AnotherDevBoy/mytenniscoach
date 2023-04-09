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

const colorsPerEventType = new Map<EventType, string>([
  [EventType.Match, '#ff9914'],
  [EventType.Training, '#f21b3f'],
  [EventType.Coaching, '#08bdbd'],
  [EventType.Gym, '#abff4f']
]);

function toProcessedEvent(e: ScheduleEventDTO) {
  return {
    event_id: e.id,
    title: e.title,
    start: new Date(e.start),
    end: new Date(e.end),
    type: e.type,
    color: colorsPerEventType.get(e.type)
  } as ProcessedEvent;
}

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

    return response.data.map((e: ScheduleEventDTO) =>
      toProcessedEvent(e)
    ) as ProcessedEvent[];
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
      type: event['type'],
      title: event.title
    };

    const response =
      action === 'create'
        ? await axios.post(`api/schedules`, scheduleEvent)
        : await axios.put(`api/schedules/${event_id}`, scheduleEvent);

    return toProcessedEvent(scheduleEvent);
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
              fields={[
                {
                  name: 'type',
                  type: 'select',
                  options: [
                    { id: 1, text: EventType.Match, value: EventType.Match },
                    {
                      id: 2,
                      text: EventType.Training,
                      value: EventType.Training
                    },
                    {
                      id: 3,
                      text: EventType.Coaching,
                      value: EventType.Coaching
                    },
                    { id: 4, text: EventType.Gym, value: EventType.Gym }
                  ],
                  config: {
                    label: 'Event Type',
                    required: true,
                    errMsg: 'Please, select an event type'
                  }
                }
              ]}
            />
          </Container>
        </Box>
      </>
    );
  }

  return <></>;
};

export default Schedule;
