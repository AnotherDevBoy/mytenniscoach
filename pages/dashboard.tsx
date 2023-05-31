import * as React from 'react';
import Router from 'next/router';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { StatsDTO } from '@/lib/types';
import { getStats } from '@/lib/api';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useUser } from '@/utils/useUser';
import useAsyncError from '@/lib/errorHandling';
import { BarChart, XAxis, YAxis, Bar } from 'recharts';

const Dashboard = () => {
  const user = useUser();
  const throwError = useAsyncError();

  const [stats, setStats] = React.useState<StatsDTO | null>(null);

  React.useEffect(() => {
    if (!user.isLoading && !user.user) {
      Router.push('/signin');
    }
  }, [user]);

  React.useEffect(() => {
    if (user.user) {
      getStats()
        .then((s) => setStats(s))
        .catch((e) => {
          throwError(e);
        });
    }
  }, [user]);

  if (user.user && stats) {
    return (
      <Grid container spacing={2}>
        <Grid xs={'auto'} md={'auto'} lg={'auto'} xl={'auto'}>
          <Card sx={{ height: 350, width: 350 }}>
            <CardHeader title="Win-rate" />
            <CardContent>
              <Typography variant="h1">{stats?.winRate}%</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid xs={'auto'} md={'auto'} lg={'auto'} xl={'auto'}>
          <Card sx={{ height: 350, width: 350 }}>
            <CardHeader title="Nemesis" />
            <CardContent>
              <Typography variant="h1">{stats.nemesis}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid xs={'auto'} md={'auto'} lg={'auto'} xl={'auto'}>
          <Card sx={{ height: 350, width: 350 }}>
            <CardHeader title="Minutes on court" />
            <CardContent>
              <BarChart
                width={300}
                height={250}
                data={Object.entries(stats.minutesOnCourt).map(
                  ([key, value]) => {
                    return { date: key, value: value };
                  }
                )}
              >
                <XAxis dataKey="date" />
                <YAxis />
                <Bar dataKey="value" fill="#1c9e68" />
              </BarChart>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  }

  return <LoadingSpinner />;
};

export default Dashboard;
