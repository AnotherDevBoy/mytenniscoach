import * as React from 'react';
import { useUser } from '@supabase/auth-helpers-react';
import Router from 'next/router';
import Menu from '@/components/Menu';

const Schedule = () => {
  const user = useUser();

  React.useEffect(() => {
    if (!user) {
      Router.push('/signin');
    }
  }, [user]);

  if (user) {
    return (
      <Menu firstSelectedItem={1} />
    );
  }

  return <></>;
}

export default Schedule;
