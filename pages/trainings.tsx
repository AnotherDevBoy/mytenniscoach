import * as React from 'react';
import { useUser } from '@supabase/auth-helpers-react';
import Router from 'next/router';
import { Typography } from '@mui/material';

const Trainings = () => {
  const user = useUser();

  React.useEffect(() => {
    if (!user) {
      Router.push('/signin');
    }
  }, [user]);

  if (!user) {
    return <></>;
  }

  return (
    <>
      <Typography variant="h4">Hey there! 👋</Typography>
      <Typography>
        You are here a bit earlier than expected. This feature will come soon 💪
      </Typography>
    </>
  );
};

export default Trainings;
