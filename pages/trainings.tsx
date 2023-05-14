import * as React from 'react';
import { useUser } from '@supabase/auth-helpers-react';
import Router from 'next/router';

const Trainings = () => {
  const user = useUser();

  React.useEffect(() => {
    if (!user) {
      Router.push('/signin');
    }
  }, [user]);

  if (user) {
    return <></>;
  }

  return <></>;
};

export default Trainings;
