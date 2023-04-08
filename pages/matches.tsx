import * as React from 'react';
import { useUser } from '@supabase/auth-helpers-react';
import Router from 'next/router';
import Menu from '@/components/Menu';

const Matches = () => {
  const user = useUser();

  React.useEffect(() => {
    if (!user) {
      Router.push('/signin');
    }
  }, [user]);

  if (user) {
    return (
      <Menu firstSelectedItem={3} />
    );
  }

  return <></>;
}

export default Matches;
