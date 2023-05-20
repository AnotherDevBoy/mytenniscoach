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
import { EventDTO, MatchEventData } from '@/lib/types';

interface SubmitMatchResultFormProps {
  onFormCompleted: (data: any) => void;
  event: EventDTO;
}

type AutoCompleteEntry = {
  id: string;
  label: string;
};

export type SubmitMatchResultFormData = {
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

const SubmitMatchResultForm = (props: SubmitMatchResultFormProps, ref: any) => {
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

  const matchData = props.event.data
    ? (props.event.data as MatchEventData)
    : undefined;

  const defaultValues = matchData
    ? {
        score: matchData.summary.score,
        winLoss: matchData.summary.win ? '1' : '2',
        duration: matchData.summary.duration,
        rainLevel: matchData.summary.rainLevel,
        windLevel: matchData.summary.windLevel,
        courtSpeed: matchData.summary.courtSpeed,
        surface: { label: matchData.summary.surface },
        forehand: { label: matchData.opponentPeformance.forehand },
        backhand: { label: matchData.opponentPeformance.backhand },
        strength1: matchData.opponentPeformance.strength1,
        strength2: matchData.opponentPeformance.strength2,
        strength3: matchData.opponentPeformance.strength3,
        weakness1: matchData.opponentPeformance.weakness1,
        weakness2: matchData.opponentPeformance.weakness2,
        weakness3: matchData.opponentPeformance.weakness3,
        changeForNextTime: matchData.opponentPeformance.changeForNextTime,
        technical: matchData.performance.technical,
        technicalNotes: matchData.performance.technicalNotes,
        tactical: matchData.performance.tactical,
        tacticalNotes: matchData.performance.tacticalNotes,
        physical: matchData.performance.physical,
        physicalNotes: matchData.performance.physicalNotes,
        mental: matchData.performance.mental,
        mentalNotes: matchData.performance.mentalNotes,
        lesson: matchData.performance.lesson
      }
    : {
        score: '',
        winLoss: '',
        duration: '',
        rainLevel: 0,
        windLevel: 0,
        courtSpeed: 0,
        surface: { label: '' },
        forehand: { label: '' },
        backhand: { label: '' },
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
      };

  const formContext = useForm<SubmitMatchResultFormData>({
    defaultValues: defaultValues
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

export default React.forwardRef(SubmitMatchResultForm);
