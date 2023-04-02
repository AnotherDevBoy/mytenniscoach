import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Home from '@mui/icons-material/Home';
import Router from 'next/router';

const NavBar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              onClick={() => {
                Router.push("/");
              }}
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <Home  />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              My Tennis Coach
            </Typography>
            <Button
              color="inherit"
              onClick={() => {
                Router.push("/signin");
              }}
            >
              Sign-In
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
  )
}

export default NavBar;