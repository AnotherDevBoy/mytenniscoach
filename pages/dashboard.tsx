import * as React from 'react';
import { useUser } from '@supabase/auth-helpers-react';
import Router from 'next/router';
import { Card, CardContent, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { StatsDTO } from '@/lib/types';
import { getStats } from '@/lib/api';

const Dashboard = () => {
  const user = useUser();

  const [stats, setStats] = React.useState<StatsDTO | null>(null);

  React.useEffect(() => {
    if (!user) {
      Router.push('/signin');
    }
  }, [user]);

  React.useEffect(() => {
    getStats().then((s) => setStats(s));
  });

  if (user && stats) {
    return (
      <>
        <Grid container spacing={2}>
          <Grid xs={12} md={6} lg={4} xl={2}>
            <Card sx={{ height: 100 }}>
              <CardContent>
                <Typography variant="h5" component="div">
                  Win-rate
                </Typography>
                <Typography variant="body2">{stats?.winRate}%</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid xs={12} md={6} lg={4} xl={2}>
            <Card sx={{ height: 100 }}>
              <CardContent>
                <Typography variant="h5" component="div">
                  Nemesis
                </Typography>
                <Typography variant="body2">{stats.nemesis}</Typography>
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
