import * as React from 'react';
import { useUser } from '@supabase/auth-helpers-react';
import Router from 'next/router';
import Menu from '@/components/Menu';
import { Box, Container, Stack, Tab, Tabs } from '@mui/material';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';

const Matches = () => {
  const user = useUser();

  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    if (!user) {
      Router.push('/signin');
    }
  }, [user]);

  if (user) {
    return (
      <>
        <Box sx={{ display: 'flex', height: '100%' }}>
          <Menu firstSelectedItem={1} />
          <Container>
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
                value={value}
                onChange={(event: React.SyntheticEvent, newValue: number) =>
                  setValue(newValue)
                }
                aria-label="basic tabs example"
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
            />
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
