import * as React from 'react';
import Router from 'next/router';
import { Typography } from '@mui/material';
import { useUser } from '@/utils/useUser';

const Trainings = () => {
  const user = useUser();

  React.useEffect(() => {
    if (!user.isLoading && !user.user) {
      Router.push('/signin');
    }
  }, [user]);

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
