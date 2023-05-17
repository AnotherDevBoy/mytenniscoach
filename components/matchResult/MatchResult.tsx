import { EventDTO } from '@/lib/types';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import React from 'react';
import SummarySubForm from '../submitMatchForm/subforms/SummarySubForm';
import PerformanceSubForm from '../submitMatchForm/subforms/PerformanceSubForm';

interface MatchResultProps {
  handleClose: () => void;
  eventDTO: EventDTO;
}

const MatchResult = (props: MatchResultProps) => {
  const [value, setValue] = React.useState('1');

  return (
    <>
      <DialogContent>
        <TabContext value={value}>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: 'divider',
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <TabList
              onChange={(_, newValue) => setValue(newValue)}
              aria-label="lab API tabs example"
            >
              <Tab label="Summary" value="1" />
              <Tab label="Performance" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">Summary</TabPanel>
          <TabPanel value="2">Performance</TabPanel>
        </TabContext>
      </DialogContent>
    </>
  );
};

export default MatchResult;
