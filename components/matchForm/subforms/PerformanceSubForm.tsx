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
          <TextFieldElement name="score" label="Score" required />
        </Grid>
        <Grid xs={12}>
          <Divider />
        </Grid>
        <Grid xs={12}>
          <TextareaAutosizeElement
            label="What did you learn from this match?"
            name="lesson"
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
