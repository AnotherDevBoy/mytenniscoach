import {
  AutocompleteElement,
  RadioButtonGroup,
  SliderElement,
  TextFieldElement,
  TextareaAutosizeElement
} from 'react-hook-form-mui';
import Grid from '@mui/material/Unstable_Grid2';
import Divider from '@mui/material/Divider';

const SummarySubForm = () => {
  return (
    <>
      <Grid container rowSpacing={2} columnSpacing={5} marginTop={1}>
        <Grid xs={6}>
          <RadioButtonGroup
            name="forehand"
            label="Forehand"
            options={[
              {
                id: '1',
                label: 'Right-handed'
              },
              {
                id: '2',
                label: 'Left-handed'
              }
            ]}
            row
            required
          />
        </Grid>
        <Grid xs={6}>
          <RadioButtonGroup
            name="backhand"
            label="Backhand"
            options={[
              {
                id: '1',
                label: 'One-handed'
              },
              {
                id: '2',
                label: 'Two-handed'
              }
            ]}
            required
          />
        </Grid>
        <Grid xs={12}>
          <Divider />
        </Grid>
        <Grid xs={6}>
          <TextFieldElement label="Strength #1" name="strength1" required />
        </Grid>
        <Grid xs={6}>
          <TextFieldElement label="Weakness #1" name="weakness1" required />
        </Grid>
        <Grid xs={6}>
          <TextFieldElement label="Strength #2" name="strength2" />
        </Grid>
        <Grid xs={6}>
          <TextFieldElement label="Weakness #2" name="weakness2" />
        </Grid>
        <Grid xs={6}>
          <TextFieldElement label="Strength #3" name="strength3" />
        </Grid>
        <Grid xs={6}>
          <TextFieldElement label="Weakness #3" name="weakness3" />
        </Grid>
        <Grid xs={12}>
          <Divider />
        </Grid>
        <Grid xs={12}>
          <TextareaAutosizeElement
            label="What to change against this player?"
            name="changeForNextTime"
            rows={5}
            fullWidth={true}
          />
        </Grid>
        <Grid xs={12}>
          <Divider />
        </Grid>
      </Grid>
    </>
  );
};

export default SummarySubForm;
