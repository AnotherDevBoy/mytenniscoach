import * as React from 'react';
import { useUser } from '@supabase/auth-helpers-react';
import Router from 'next/router';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

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
        <Grid container spacing={2}>
          <Grid xs={12} md={6} lg={4} xl={2}>
            <Card sx={{ height: 100 }}>
              <CardContent>
                <Typography variant="h5" component="div">
                  Matches played this month
                </Typography>
                <Typography variant="body2">3</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid xs={12} md={6} lg={4} xl={2}>
            <Card sx={{ height: 100 }}>
              <CardContent>
                <Typography variant="h5" component="div">
                  Monthly winrate
                </Typography>
                <Typography variant="body2">50%</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </>
    );
  }

  return <></>;
};

export default Dashboard;
