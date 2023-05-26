import NextLink from 'next/link';
import Image from 'next/image';
import ArrowLeftIcon from '@heroicons/react/24/solid/ArrowLeftIcon';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';

const Page = () => (
  <>
    <Box
      component="main"
      sx={{
        alignItems: 'center',
        display: 'flex',
        flexGrow: 1,
        minHeight: '100%'
      }}
    >
      <Container maxWidth="md">
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
            marginTop: 7
          }}
        >
          <Box
            sx={{
              mb: 3,
              textAlign: 'center'
            }}
          >
            <Image
              alt="Under development"
              src="/assets/errors/error-404.png"
              width={400}
              height={400}
              style={{
                display: 'inline-block',
                maxWidth: '100%'
              }}
            />
          </Box>
          <Typography align="center" sx={{ mb: 3 }} variant="h3">
            404: The page you are looking for isn’t here
          </Typography>
          <Button
            component={NextLink}
            href="/"
            startIcon={
              <SvgIcon fontSize="small">
                <ArrowLeftIcon />
              </SvgIcon>
            }
            sx={{ mt: 3 }}
            variant="contained"
          >
            Go back
          </Button>
        </Box>
      </Container>
    </Box>
  </>
);

export default Page;
