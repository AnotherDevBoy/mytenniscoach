import * as React from 'react';
import { useUser } from '@supabase/auth-helpers-react';
import Router from 'next/router';
import Menu from '@/components/Menu';
import { Scheduler } from '@aldabil/react-scheduler';
import { Box, Container } from '@mui/material';
import { EventActions, ProcessedEvent } from '@aldabil/react-scheduler/types';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { useState } from 'react';

const Schedule = () => {
  const user = useUser();

  const [loading, setLoading] = useState(true);
  const [schedule, setSchedule] = useState([] as ProcessedEvent[]);

  React.useEffect(() => {
    if (!user) {
      Router.push('/signin');
    }
  }, [user]);

  React.useEffect(() => {
    if (!user) {
      return;
    }

    if (!loading) {
      return;
    }

    axios
      .get(`api/schedules/${user?.id}`)
      .then((response) => {
        const events: ProcessedEvent[] = response.data.map((e: any) => {
          return {
            title: e.title,
            start: new Date(e.start),
            end: new Date(e.end)
          };
        });

        setSchedule(events);
        setLoading(false);
      })
      .catch(console.error);
  }, [user, loading]);

  async function createSchedule(
    event: ProcessedEvent,
    action: EventActions
  ): Promise<ProcessedEvent> {
    console.log(JSON.stringify(event));
    console.log(JSON.stringify(action));

    // TODO: types
    const scheduleEvent = {
      id: uuidv4(),
      userId: user?.id,
      start: event.start,
      end: event.end,
      type: 'Match',
      title: event.title
    };

    const response = await axios.post(
      `api/schedules/${user?.id}`,
      scheduleEvent
    );

    console.log(JSON.stringify(response.data));

    setLoading(true);

    return event;
  }

  if (user) {
    return (
      <>
        <Box sx={{ display: 'flex' }}>
          <Menu firstSelectedItem={1} />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            {loading ? (
              <></>
            ) : (
              <Scheduler
                view="month"
                onConfirm={async (event, action) =>
                  await createSchedule(event, action)
                }
                events={schedule}
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
