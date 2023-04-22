import * as React from 'react';
import { useUser } from '@supabase/auth-helpers-react';
import Router from 'next/router';
import AppNavigation from '@/components/AppNavigation';
import { Scheduler } from '@aldabil/react-scheduler';
import { Box, Container } from '@mui/material';
import { ProcessedEvent, ViewEvent } from '@aldabil/react-scheduler/types';

import { EventDTO } from '@/lib/types';
import ScheduleEventEditor from '@/components/schedule/ScheduleEventEditor';
import { toProcessedEvent } from '@/lib/convert';
import { getEvents, deleteEvent } from '@/lib/api';

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
    return (await getEvents()).map((e: EventDTO) =>
      toProcessedEvent(e)
    ) as ProcessedEvent[];
  };

  async function onDeleteEvent(id: string | number): Promise<string | number> {
    await deleteEvent(id as string);
    return id;
  }

  if (user) {
    return (
      <>
        <Box sx={{ display: 'flex' }}>
          <AppNavigation firstSelectedItem={1} />
          <Container maxWidth="lg" sx={{ paddingTop: 10 }}>
            <Scheduler
              view="month"
              onDelete={onDeleteEvent}
              getRemoteEvents={getScheduledEvents}
              customEditor={(scheduler) => (
                <ScheduleEventEditor scheduler={scheduler} />
              )}
            />
          </Container>
        </Box>
      </>
    );
  }

  return <></>;
};

export default Schedule;
