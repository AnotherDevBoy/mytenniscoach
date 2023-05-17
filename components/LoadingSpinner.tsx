import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

const LoadingSpinner = () => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '90%', // TODO: Is there a better way?
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default LoadingSpinner;
