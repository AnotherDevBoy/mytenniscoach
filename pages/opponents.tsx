import * as React from 'react';
import { useUser } from '@supabase/auth-helpers-react';
import Router from 'next/router';
import AppNavigation from '@/components/AppNavigation';

const Opponents = () => {
  const user = useUser();

  React.useEffect(() => {
    if (!user) {
      Router.push('/signin');
    }
  }, [user]);

  if (user) {
    return <AppNavigation firstSelectedItem={4} />;
  }

  return <></>;
};

export default Opponents;
