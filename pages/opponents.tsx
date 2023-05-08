import * as React from 'react';
import { useUser } from '@supabase/auth-helpers-react';
import Router from 'next/router';
import AppNavigation from '@/components/AppNavigation';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { DataGrid } from '@mui/x-data-grid/DataGrid';
import { GridColDef } from '@mui/x-data-grid/models';
import { getOpponentsStats } from '@/lib/api';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID' },
  {
    field: 'name',
    headerName: 'Name',
    editable: false
  },
  {
    field: 'forehand',
    headerName: 'Forehand',
    editable: false
  },
  {
    field: 'backhand',
    headerName: 'Backhand',
    editable: false
  },
  {
    field: 'winrate',
    headerName: 'Winrate',
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
    getOpponentsStats().then((opponents) => {
      console.log(opponents);
      const rows = opponents.map((o, i) => {
        return {
          id: i,
          name: o.opponentName,
          forehand: o.forehand,
          backhand: o.backhand,
          winrate: o.winRate
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
              autoHeight
              sx={{ marginBottom: 5, width: 'auto' }}
              disableRowSelectionOnClick
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

export default Opponents;
