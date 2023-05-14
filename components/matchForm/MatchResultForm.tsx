import { FormContainer, useForm } from 'react-hook-form-mui';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import SummarySubForm from './subforms/SummarySubForm';
import React from 'react';
import OpponentSubForm from './subforms/OpponentSubForm';
import PerformanceSubForm from './subforms/PerformanceSubForm';
import { DialogContent } from '@mui/material';

interface MatchResultFormProps {
  onFormCompleted: (data: any) => void;
}

type AutoCompleteEntry = {
  id: string;
  label: string;
};

export type MatchFormData = {
  score: string;
  winLoss: string;
  duration: string;
  rainLevel: number;
  windLevel: number;
  courtSpeed: number;
  surface: AutoCompleteEntry;
  forehand: AutoCompleteEntry;
  backhand: AutoCompleteEntry;
  strength1: string;
  strength2: string;
  strength3: string;
  weakness1: string;
  weakness2: string;
  weakness3: string;
  changeForNextTime: string;
  technical: number;
  technicalNotes: string;
  tactical: number;
  tacticalNotes: string;
  physical: number;
  physicalNotes: string;
  mental: number;
  mentalNotes: string;
  lesson: string;
};

const MatchResultForm = (props: MatchResultFormProps, ref: any) => {
  const [formSection, setFormSection] = useState(0);

  function buildNavigation(): JSX.Element[] {
    const sections = ['Summary', 'Opponent', 'Performance'];

    return sections.map((s, i) => {
      return (
        <Typography
          key={`${i}`}
          color={i === formSection ? 'text.primary' : 'text.secondary'}
        >
          {s}
        </Typography>
      );
    });
  }

  const formContext = useForm<MatchFormData>({
    defaultValues: {
      score: '',
      winLoss: '',
      duration: '',
      rainLevel: 0,
      windLevel: 0,
      courtSpeed: 0,
      surface: undefined,
      forehand: undefined,
      backhand: undefined,
      strength1: '',
      strength2: '',
      strength3: '',
      weakness1: '',
      weakness2: '',
      weakness3: '',
      changeForNextTime: '',
      technical: 0,
      technicalNotes: '',
      tactical: 0,
      tacticalNotes: '',
      physical: 0,
      physicalNotes: '',
      mental: 0,
      mentalNotes: '',
      lesson: ''
    }
  });

  const { handleSubmit } = formContext;

  return (
    <>
      <FormContainer
        formContext={formContext}
        handleSubmit={handleSubmit((data) => {
          if (formSection < 2) {
            setFormSection(formSection + 1);
            return;
          }

          props.onFormCompleted(data);
        })}
      >
        <DialogContent>
          <Stack>
            <Breadcrumbs separator="›">{buildNavigation()}</Breadcrumbs>
            {formSection === 0 ? (
              <SummarySubForm />
            ) : formSection === 1 ? (
              <OpponentSubForm />
            ) : (
              <PerformanceSubForm />
            )}
          </Stack>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              width: '100%',
              gap: 2,
              marginTop: 1
            }}
          >
            {formSection > 0 ? (
              <Button
                variant="contained"
                onClick={() =>
                  setFormSection(
                    formSection === 0 ? formSection : formSection - 1
                  )
                }
              >
                BACK
              </Button>
            ) : (
              <></>
            )}
            <Button type={'submit'} variant="contained">
              {formSection < 2 ? 'NEXT' : 'DONE'}
            </Button>
          </Box>
        </DialogContent>
      </FormContainer>
    </>
  );
};

export default React.forwardRef(MatchResultForm);
