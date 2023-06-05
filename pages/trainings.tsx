import * as React from 'react';
import Router from 'next/router';
import { Typography } from '@mui/material';
import { useUser } from '@/utils/useUser';
import LoadingSpinner from '@/components/LoadingSpinner';

const Trainings = () => {
  const user = useUser();

  if (user.isLoading) {
    return <LoadingSpinner />;
  }

  if (!user.user) {
    Router.push('/signin');
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
