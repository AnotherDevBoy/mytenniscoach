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

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
  borderRadius: '10px'
};

interface MatchResultFormProps {
  onFormCompleted: (data: any) => void;
}

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

  const formContext = useForm<any>({
    defaultValues: {
      rainLevel: 0,
      windLevel: 0,
      courtSpeed: 0,
      technical: 0,
      tactical: 0,
      physical: 0,
      mental: 0
    }
  });

  const { handleSubmit } = formContext;

  return (
    <>
      <Stack sx={{ ...style }}>
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
          <Breadcrumbs separator="›">{buildNavigation()}</Breadcrumbs>
          {formSection === 0 ? (
            <SummarySubForm />
          ) : formSection === 1 ? (
            <OpponentSubForm />
          ) : (
            <PerformanceSubForm />
          )}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              gap: '10px',
              marginTop: '15px'
            }}
          >
            {formSection < 2 ? (
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
        </FormContainer>
      </Stack>
    </>
  );
};

export default React.forwardRef(MatchResultForm);
