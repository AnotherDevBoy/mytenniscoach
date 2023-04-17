import * as React from 'react';
import { useUser } from '@supabase/auth-helpers-react';
import Router from 'next/router';
import AppNavigation from '@/components/AppNavigation';
import { Scheduler } from '@aldabil/react-scheduler';
import { Box, Container } from '@mui/material';
import { ProcessedEvent, ViewEvent } from '@aldabil/react-scheduler/types';

import { ScheduleEventDTO } from '@/lib/types';
import EventEditor from '@/components/schedule/EventEditor';
import { toProcessedEvent } from '@/lib/convert';
import { getScheduleEvents, deleteScheduleEvent } from '@/lib/api';

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
    return (await getScheduleEvents()).map((e: ScheduleEventDTO) =>
      toProcessedEvent(e)
    ) as ProcessedEvent[];
  };

  async function deleteScheduledEvent(
    id: string | number
  ): Promise<string | number> {
    await deleteScheduleEvent(id as string);
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
              onDelete={deleteScheduledEvent}
              getRemoteEvents={getScheduledEvents}
              customEditor={(scheduler) => (
                <EventEditor scheduler={scheduler} />
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
