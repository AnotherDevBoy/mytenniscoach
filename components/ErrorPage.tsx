import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Image, { ImageLoaderProps } from 'next/image';
import { useSnackbar } from 'notistack';
import { FallbackProps } from 'react-error-boundary';

const customLoader = ({ src }: ImageLoaderProps) => {
  return `${src}`;
};

const ErrorPage = ({ error }: FallbackProps) => {
  const { enqueueSnackbar } = useSnackbar();

  const e = error as Error;

  enqueueSnackbar(e.message, {
    variant: 'error',
    anchorOrigin: { horizontal: 'center', vertical: 'bottom' }
  });

  return (
    <Stack
      height={'100%'}
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <Typography variant="h3" sx={{ marginBottom: 5 }}>
        💥 Something went wrong
      </Typography>
      <Image
        src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNWNlYmQ2MzgyNjZjN2VlZDk2YmU0MDRlYjE1MTJkMDBkYTUwMmE1OSZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/fMzhBp1medVHV1ceOJ/giphy-downsized.gif"
        alt="Racket Broken"
        width={500}
        height={500}
        loader={customLoader}
        priority
      />
    </Stack>
  );
};

export default ErrorPage;
