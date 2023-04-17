import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import SportsTennisIcon from '@mui/icons-material/SportsTennis';
import PeopleIcon from '@mui/icons-material/People';
import Router from 'next/router';
import MenuIcon from '@mui/icons-material/Menu';
import { styled } from '@mui/material/styles';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { Toolbar, IconButton, Typography, Button } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

interface AppNavigationProps {
  window?: () => Window;
  firstSelectedItem: number;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open'
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open'
})(({ theme, open }) => ({
  '& .MuiDrawer-paper': {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }),
    boxSizing: 'border-box',
    ...(!open && {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9)
      }
    })
  }
}));

const AppNavigation = (props: AppNavigationProps) => {
  const supabaseClient = useSupabaseClient();

  const { window } = props;

  const [open, setOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const [selectedIndex, setSelectedIndex] = React.useState(
    props.firstSelectedItem
  );

  function onMenuItemSelected(index: number) {
    setSelectedIndex(index);
    Router.push(`/${sections[index].name.toLowerCase()}`);
  }

  const drawerContent = (
    <List component="nav">
      {sections.map((element, index) => {
        return (
          <ListItemButton
            key={index}
            selected={selectedIndex == index}
            onClick={() => onMenuItemSelected(index)}
          >
            <ListItemIcon>{element.icon}</ListItemIcon>
            <ListItemText
              primary={selectedIndex == index ? element.name : null}
              secondary={selectedIndex != index ? element.name : null}
            />
          </ListItemButton>
        );
      })}
    </List>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar
          position="absolute"
          open={open}
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}
        >
          <Toolbar
            sx={{
              pr: '24px' // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerToggle}
              sx={{
                display: { xs: 'none', sm: 'block' },
                marginRight: '36px',
                ...(open && { display: 'none' })
              }}
            >
              <MenuIcon />
            </IconButton>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerToggle}
              sx={{
                display: { xs: 'block', sm: 'none' },
                marginRight: '36px'
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              My tennis coach
            </Typography>
          </Toolbar>
          <Button
            color="inherit"
            onClick={async () => {
              await supabaseClient.auth.signOut();
              Router.push('/');
            }}
          >
            Sign-out
          </Button>
        </AppBar>

        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          <MuiDrawer
            container={container}
            variant="temporary"
            open={open}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth
              }
            }}
          >
            {drawerContent}
          </MuiDrawer>
          <Drawer
            variant="permanent"
            open={open}
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            <Toolbar
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                px: [1]
              }}
            >
              <IconButton onClick={handleDrawerToggle}>
                <ChevronLeftIcon />
              </IconButton>
            </Toolbar>
            {drawerContent}
          </Drawer>
        </Box>
      </Box>
    </>
  );
};

const sections = [
  {
    name: 'Dashboard',
    icon: <DashboardIcon />
  },
  {
    name: 'Schedule',
    icon: <CalendarMonthIcon />
  },
  {
    name: 'Trainings',
    icon: <FitnessCenterIcon />
  },
  {
    name: 'Matches',
    icon: <SportsTennisIcon />
  },
  {
    name: 'Opponents',
    icon: <PeopleIcon />
  }
];

export default AppNavigation;
