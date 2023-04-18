import * as React from 'react';
import { useUser } from '@supabase/auth-helpers-react';
import Router from 'next/router';
import AppNavigation from '@/components/AppNavigation';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { DataGrid } from '@mui/x-data-grid/DataGrid';
import { GridColDef } from '@mui/x-data-grid/models';
import { getOpponents } from '@/lib/api';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'name',
    headerName: 'Name',
    width: 150,
    editable: false
  }
];

interface OpponentRow {
  id: number;
  name: string;
}

const Opponents = () => {
  const user = useUser();

  const [opponents, setOpponents] = React.useState<OpponentRow[]>([]);

  React.useEffect(() => {
    if (!user) {
      Router.push('/signin');
    }
  }, [user]);

  React.useEffect(() => {
    getOpponents().then((opponents) => {
      const rows = opponents.map((o, i) => {
        return {
          id: i,
          name: o.name
        } as OpponentRow;
      });

      setOpponents(rows);
    });
  }, [user]);

  if (user) {
    return (
      <>
        <Box sx={{ display: 'flex' }}>
          <AppNavigation firstSelectedItem={4} />
          <Container maxWidth="xl" sx={{ paddingTop: 10 }}>
            <DataGrid
              rows={opponents}
              columns={columns}
              disableRowSelectionOnClick
            />
          </Container>
        </Box>
      </>
    );
  }

  return <></>;
};

export default Opponents;
