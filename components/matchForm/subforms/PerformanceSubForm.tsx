import {
  SliderElement,
  TextareaAutosizeElement
} from 'react-hook-form-mui';
import Grid from '@mui/material/Unstable_Grid2';
import Divider from '@mui/material/Divider';

const SummarySubForm = () => {
  return (
    <>
      <Grid container rowSpacing={2} columnSpacing={5} marginTop={1}>
        <Grid xs={6}>
          <SliderElement marks max={4} min={0} name="technical" label="Technical"/>
        </Grid>
        <Grid xs={6}>
          <SliderElement marks max={4} min={0} name="tactical" label="Tactical" />
        </Grid>
        <Grid xs={6}>
          <TextareaAutosizeElement
            label="Notes"
            name="technicalNotes"
            rows={5}
            fullWidth={true}
          />
        </Grid>
        <Grid xs={6}>
          <TextareaAutosizeElement
            label="Notes"
            name="tacticalNotes"
            rows={5}
            fullWidth={true}
          />
        </Grid>
        <Grid xs={6}>
          <SliderElement marks max={4} min={0} name="physical" label="Physical" />
        </Grid>
        <Grid xs={6}>
          <SliderElement marks max={4} min={0} name="mental" label="Mental" />
        </Grid>
        <Grid xs={6}>
          <TextareaAutosizeElement
            label="Notes"
            name="physicalNotes"
            rows={5}
            fullWidth={true}
          />
        </Grid>
        <Grid xs={6}>
          <TextareaAutosizeElement
            label="Notes"
            name="mentalNotes"
            rows={5}
            fullWidth={true}
          />
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
