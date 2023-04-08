import * as React from 'react';
import { useUser } from '@supabase/auth-helpers-react';
import Router from 'next/router';
import Menu from '@/components/Menu';
import { Scheduler } from "@aldabil/react-scheduler";
import { Box, Container } from '@mui/material';


const Schedule = () => {
  const user = useUser();

  React.useEffect(() => {
    if (!user) {
      Router.push('/signin');
    }
  }, [user]);

  if (user) {
    return (
      <>
       <Box sx={{ display: 'flex' }}>
       <Menu firstSelectedItem={1} />
       <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
       <Scheduler
          view="month"
          events={[
            {
              event_id: 1,
              title: "Event 1",
              type: "Match",
              start: new Date("2021/5/2 09:30"),
              end: new Date("2021/5/2 10:30"),
            },
            {
              event_id: 2,
              title: "Event 2",
              type: "Tournament",
              start: new Date("2021/5/4 10:00"),
              end: new Date("2021/5/4 11:00"),
            },
          ]}
        />
        </Container>
       </Box>
      </>
    );
  }

  return <></>;
}

export default Schedule;
