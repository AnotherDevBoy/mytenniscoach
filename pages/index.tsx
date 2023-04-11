import * as React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { Button } from '@mui/material';
import Router from 'next/router';

export default function Landing() {
  return (
    <>
      <Grid
        container
        sx={{
          backgroundImage: 'url("/assets/landing/basket.jpg")',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          height: '800px',
          width: '100%'
        }}
      >
        <Grid xs={1} sx={{ height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Grid container spacing={2}>
            <Grid xs={6}>
            <Button variant="contained" onClick={() => Router.push('signin')}>Join as a Player</Button>
            </Grid>
            <Grid xs={6}>
            <Button variant="contained" disabled>Join as a Coach</Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
