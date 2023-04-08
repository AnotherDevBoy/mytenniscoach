import * as React from 'react';
import { styled } from '@mui/material/styles';
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
]



const Menu = ( props: { firstSelectedItem: number; } ) => {
  const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== 'open'
  })(() => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      width: 240
    }
  }));

  const [ selectedIndex, setSelectedIndex ] = React.useState(props.firstSelectedItem);

  function onMenuItemSelected(index: number) {
    setSelectedIndex(index);
    Router.push(`/${sections[index].name.toLowerCase()}`)
  }

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Drawer variant="permanent">
          <List component="nav">
            {sections.map((element, index) => {
              return (
                <ListItemButton selected={ selectedIndex == index} onClick={() => onMenuItemSelected(index)}>
                  <ListItemIcon>
                    { element.icon }
                  </ListItemIcon>
                  <ListItemText primary={ selectedIndex == index? element.name : null}  secondary={ selectedIndex != index ? element.name : null}/>
                </ListItemButton>
              );
            })}
          </List>
        </Drawer>
      </Box>
    </>
  );
};

export default Menu;