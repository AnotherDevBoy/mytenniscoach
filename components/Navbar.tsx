import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Home from '@mui/icons-material/Home';
import Router from 'next/router';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useUser } from '@/utils/useUser';

const NavBar = () => {
  const supabaseClient = useSupabaseClient();
  const { user } = useUser();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            My Tennis Coach
          </Typography>
          {user ? (
            <Button
              color="inherit"
              onClick={async () => {
                await supabaseClient.auth.signOut();
                Router.push('/');
              }}
            >
              Sign-out
            </Button>
          ) : (
            <Button
              color="inherit"
              onClick={() => {
                Router.push('/signin');
              }}
            >
              Sign-In
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
