import { FormContainer, TextFieldElement } from 'react-hook-form-mui';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useState } from 'react';

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

const MatchResultForm = () => {
  const [formSection, setFormSection] = useState(0);

  function buildNavigation(): JSX.Element[] {
    const sections = ['Summary', 'Opponent', 'Performance'];

    return sections.map((s, i) => {
      return (
        <Typography
          key={`${i}`}
          color={i === formSection ? 'text.primary' : 'text.secondary'}
          onClick={() => setFormSection(i)}
          sx={{ '&:hover': { textDecoration: 'underline', cursor: 'pointer' } }}
        >
          {s}
        </Typography>
      );
    });
  }

  return (
    <>
      <Box sx={{ ...style }}>
        <FormContainer
          defaultValues={{ name: '' }}
          onSuccess={(data) => console.log(data)}
        >
          <Breadcrumbs separator="›">{buildNavigation()}</Breadcrumbs>
          <TextFieldElement name="name" label="Name" required />
        </FormContainer>
      </Box>
    </>
  );
};

export default MatchResultForm;
