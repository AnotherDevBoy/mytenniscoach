import * as React from 'react';
import { useUser } from '@supabase/auth-helpers-react';
import Router from 'next/router';
import AppNavigation from '@/components/AppNavigation';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography
} from '@mui/material';

const Dashboard = () => {
  const user = useUser();

  React.useEffect(() => {
    if (!user) {
      Router.push('/signin');
    }
  }, [user]);

  if (user) {
    return (
      <>
        <Box sx={{ display: 'flex', height: '100%' }}>
          <AppNavigation firstSelectedItem={0} />
          <Box
            sx={{
              display: 'flex',
              height: '100%',
              justifyContent: 'space-evenly',
              width: '100%',
              paddingTop: 15
            }}
          >
            <Card sx={{ minWidth: 275, height: 100 }}>
              <CardContent>
                <Typography variant="h5" component="div">
                  Matches played this month
                </Typography>
                <Typography variant="body2">3</Typography>
              </CardContent>
            </Card>
            <Card sx={{ minWidth: 275, height: 100 }}>
              <CardContent>
                <Typography variant="h5" component="div">
                  Monthly winrate
                </Typography>
                <Typography variant="body2">50%</Typography>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </>
    );
  }

  return <></>;
};

export default Dashboard;
