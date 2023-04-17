import * as React from 'react';
import { useUser } from '@supabase/auth-helpers-react';
import Router from 'next/router';
import AppNavigation from '@/components/AppNavigation';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import Modal from '@mui/material/Modal';
import MatchResultForm from '@/components/matchForm/MatchResultForm';

const Matches = () => {
  const user = useUser();

  const [displayOldMatches, setDisplayOldMatches] = React.useState(true);
  const [modalOpen, setModalOpen] = React.useState(false);

  React.useEffect(() => {
    if (!user) {
      Router.push('/signin');
    }
  }, [user]);

  if (user) {
    return (
      <>
        <Box sx={{ display: 'flex', height: '100%' }}>
          <AppNavigation firstSelectedItem={3} />
          <Container sx={{ paddingTop: 10 }}>
            <Box
              justifyContent={'center'}
              sx={{
                display: 'flex',
                borderBottom: 1,
                borderColor: 'divider',
                marginBottom: 5
              }}
            >
              <Tabs
                value={displayOldMatches ? 0 : 1}
                onChange={(_: React.SyntheticEvent, newValue: number) =>
                  setDisplayOldMatches(newValue === 0)
                }
              >
                <Tab label="Previous matches" />
                <Tab label="Upcoming matches" />
              </Tabs>
            </Box>
            <DataGrid
              rows={rows}
              columns={columns}
              autoHeight
              sx={{ marginBottom: 5, width: 'auto' }}
              columnVisibilityModel={{
                id: false
              }}
              onRowClick={() => setModalOpen(true)}
            />
            <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
              <MatchResultForm onFormCompleted={() => setModalOpen(false)} />
            </Modal>
          </Container>
        </Box>
      </>
    );
  }

  return <></>;
};

const columns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'id',
    hideable: true,
    flex: 1,
    align: 'center',
    headerAlign: 'center'
  },
  {
    field: 'date',
    headerName: 'Date',
    flex: 1,
    align: 'center',
    headerAlign: 'center'
  },
  {
    field: 'title',
    headerName: 'Title',
    width: 200,
    flex: 1,
    align: 'center',
    headerAlign: 'center'
  },
  {
    field: 'played',
    headerName: 'Played',
    flex: 1,
    align: 'center',
    headerAlign: 'center'
  }
];

const rows: GridRowsProp = [
  { id: 1, date: '10/04/2023', title: 'Match with Miguel', played: '✅' },
  { id: 2, date: '11/04/2023', title: 'Match with Bella', played: '❌' },
  { id: 3, date: '12/04/2023', title: 'Match with Carla', played: '❌' }
];

export default Matches;
