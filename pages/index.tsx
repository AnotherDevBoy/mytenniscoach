import * as React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { Button } from '@mui/material';
import Router from 'next/router';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
export default function Landing() {
  let imageToRender = "https://res.cloudinary.com/dmbedhocm/image/upload/w_1600/v1681227237/mytenniscoach/basket.webp";

  const theme = useTheme();

  if (useMediaQuery(theme.breakpoints.down('sm'))) {
    imageToRender = "https://res.cloudinary.com/dmbedhocm/image/upload/w_600/v1681227237/mytenniscoach/basket.webp"
  }

  if (useMediaQuery(theme.breakpoints.between('sm', 'md'))) {
    imageToRender = "https://res.cloudinary.com/dmbedhocm/image/upload/w_900/v1681227237/mytenniscoach/basket.webp"
  }

  if (useMediaQuery(theme.breakpoints.between('md', 'lg'))) {
    imageToRender = "https://res.cloudinary.com/dmbedhocm/image/upload/w_1200/v1681227237/mytenniscoach/basket.webp"
  }

  return (
    <>
      <Grid
        container
        sx={{
          backgroundImage: `url('${imageToRender}')`,
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
