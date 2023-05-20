import * as React from 'react';
import Router from 'next/router';
import { Card, CardContent, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { StatsDTO } from '@/lib/types';
import { getStats } from '@/lib/api';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useUser } from '@/utils/useUser';

const Dashboard = () => {
  const user = useUser();

  const [stats, setStats] = React.useState<StatsDTO | null>(null);

  React.useEffect(() => {
    if (!user.isLoading && !user.user) {
      Router.push('/signin');
    }
  }, [user]);

  React.useEffect(() => {
    if (user.user) {
      getStats().then((s) => setStats(s));
    }
  }, [user]);

  if (user.user && stats) {
    return (
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
    );
  }

  return <LoadingSpinner />;
};

export default Dashboard;
