import * as React from 'react';
import { useUser } from '@supabase/auth-helpers-react';
import Router from 'next/router';
import AppNavigation from '@/components/AppNavigation';
import { Scheduler } from '@aldabil/react-scheduler';
import { Box, CircularProgress, Container } from '@mui/material';
import { ProcessedEvent, ViewEvent } from '@aldabil/react-scheduler/types';

import { EventDTO, OpponentDTO } from '@/lib/types';
import ScheduleEventEditor from '@/components/schedule/ScheduleEventEditor';
import { toProcessedEvent } from '@/lib/convert';
import { getEvents, deleteEvent, getOpponents } from '@/lib/api';

const Schedule = () => {
  const [loading, setLoading] = React.useState(true);
  const [opponents, setOpponents] = React.useState<OpponentDTO[]>([]);

  const refreshOpponents = async (): Promise<void> => {
    const receivedOpponents = await getOpponents();
    setOpponents(receivedOpponents);
    setLoading(false);
  };

  React.useEffect(() => {
    refreshOpponents();
  }, []);

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
      toProcessedEvent(e, opponents)
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
            {loading ? (
              <CircularProgress />
            ) : (
              <Scheduler
                view="month"
                onDelete={onDeleteEvent}
                getRemoteEvents={getScheduledEvents}
                customEditor={(scheduler) => (
                  <ScheduleEventEditor
                    scheduler={scheduler}
                    opponents={opponents}
                    onComplete={async () => {
                      setLoading(true);
                      await refreshOpponents();
                    }}
                  />
                )}
              />
            )}
          </Container>
        </Box>
      </>
    );
  }

  return <></>;
};

export default Schedule;
