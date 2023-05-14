import * as React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { Button } from '@mui/material';
import Router from 'next/router';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import LandingLayout from '@/layouts/landingLayout';

export default function Landing() {
  let resolution = 'w_1600';

  const theme = useTheme();

  if (useMediaQuery(theme.breakpoints.down('sm'))) {
    resolution = 'w_600';
  }

  if (useMediaQuery(theme.breakpoints.between('sm', 'md'))) {
    resolution = 'w_900';
  }

  if (useMediaQuery(theme.breakpoints.between('md', 'lg'))) {
    resolution = 'w_1200';
  }

  return (
    <>
      <Grid
        container
        sx={{
          backgroundImage: `url('https://res.cloudinary.com/dmbedhocm/image/upload/${resolution}/v1681227237/mytenniscoach/basket.webp')`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          height: '800px',
          width: '100%'
        }}
      >
        <Grid
          xs={1}
          sx={{
            height: '100%',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Grid container spacing={2}>
            <Grid xs={6}>
              <Button variant="contained" onClick={() => Router.push('signin')}>
                Join as a Player
              </Button>
            </Grid>
            <Grid xs={6}>
              <Button variant="contained" disabled>
                Join as a Coach
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

Landing.getLayout = function getLayout(page: any) {
  return <LandingLayout>{page}</LandingLayout>;
};
