import {
  AutocompleteElement,
  RadioButtonGroup,
  SliderElement,
  TextFieldElement
} from 'react-hook-form-mui';
import Grid from '@mui/material/Unstable_Grid2';
import Divider from '@mui/material/Divider';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import AirIcon from '@mui/icons-material/Air';
import TornadoIcon from '@mui/icons-material/Tornado';

const SummarySubForm = () => {
  return (
    <>
      <Grid container spacing={2} marginTop={1}>
        <Grid xs={6}>
          <TextFieldElement name="score" label="Score" required />
        </Grid>
        <Grid xs={6}>
          <RadioButtonGroup
            name="winLoss"
            options={[
              {
                id: '1',
                label: 'Win'
              },
              {
                id: '2',
                label: 'Loss'
              }
            ]}
            row
            required
          />
        </Grid>
        <Grid xs={6}>
          <TextFieldElement name="duration" label="Duration" required />
        </Grid>
        <Grid xs={12}>
          <Divider />
        </Grid>
        <Grid xs={1}>
          <WbSunnyIcon />
        </Grid>
        <Grid xs={4}>
          <SliderElement
            marks
            max={4}
            min={0}
            name="rainLevel"
          />
        </Grid>
        <Grid xs={1}>
          <ThunderstormIcon />
        </Grid>
        <Grid xs={1}>
          <AirIcon />
        </Grid>
        <Grid xs={4}>
          <SliderElement
            marks
            max={4}
            min={0}
            name="windLevel"
          />
        </Grid>
        <Grid xs={1}>
          <TornadoIcon />
        </Grid>
        <Grid xs={6}>
          <AutocompleteElement
            label="Surface"
            name="surface"
            options={[
              {
                id: 1,
                label: 'Clay'
              },
              {
                id: 2,
                label: 'Grass'
              },
              {
                id: 3,
                label: 'Hard'
              },
              {
                id: 4,
                label: 'Tarmac'
              },
              {
                id: 5,
                label: 'Astroturf'
              }
            ]}
            required
          />
        </Grid>
        <Grid xs={1}>🐢</Grid>
        <Grid xs={4}>
          <SliderElement
            marks
            max={4}
            min={0}
            name="courtSpeed"
          />
        </Grid>
        <Grid xs={1}>🚀</Grid>
        <Grid xs={12}>
          <Divider />
        </Grid>
      </Grid>
    </>
  );
};

export default SummarySubForm;
