import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { getURL } from '@/utils/helpers';
import { Copyright } from '@mui/icons-material';
import { Container, CssBaseline, Box, Avatar, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LandingLayout from '@/layouts/landingLayout';
import { useUser } from '@/utils/useUser';
import React from 'react';
import LoadingSpinner from '@/components/LoadingSpinner';
import Router from 'next/router';

const SignUp = () => {
  const user = useUser();
  const supabaseClient = useSupabaseClient();

  React.useEffect(() => {
    if (user.user) {
      Router.push('/dashboard');
    }
  }, [user]);

  console.log(user);

  if (!user.isLoading && !user.user) {
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Auth
            supabaseClient={supabaseClient}
            redirectTo={getURL() + '/dashboard'}
            providers={['google']}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: '#404040',
                    brandAccent: '#52525b'
                  }
                }
              }
            }}
            theme="light"
          />
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Box>
      </Container>
    );
  }

  return <LoadingSpinner />;
};

SignUp.getLayout = function getLayout(page: any) {
  return <LandingLayout>{page}</LandingLayout>;
};

export default SignUp;
