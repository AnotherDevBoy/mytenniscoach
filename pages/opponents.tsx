import * as React from 'react';
import Router from 'next/router';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid/DataGrid';
import { GridColDef } from '@mui/x-data-grid/models';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Dialog from '@mui/material/Dialog';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

import { OpponentStatsDTO } from '@/lib/types';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useUser } from '@/utils/useUser';
import { format, parseISO } from 'date-fns';
import { useOpponentsStats } from '@/hooks/useOpponentsStats';
import Button from '@mui/material/Button';

function stringOrNA(value: string) {
  return value ? value : 'N/A';
}

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

const Opponents = () => {
  const user = useUser();
  const { isLoading, data } = useOpponentsStats();
  const [selectedOpponent, setSelectedOpponent] = React.useState<number>(0);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [selectedMatch, setSelectedMatch] = React.useState<number>(0);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  if (user.isLoading) {
    return <LoadingSpinner />;
  }

  if (!user.user) {
    Router.push('/signin');
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const opponents = data ? (data as OpponentStatsDTO[]) : [];

  const rows = opponents.map((o, i) => {
    return {
      id: i,
      name: o.opponentName,
      forehand: o.forehand,
      backhand: o.backhand,
      winrate: o.winRate
    };
  });

  return (
    <>
      <DataGrid
        rows={rows}
        columns={columns}
        autoHeight
        sx={{ marginBottom: 5, width: 'auto' }}
        disableRowSelectionOnClick
        columnVisibilityModel={{
          id: false
        }}
        onRowClick={(a) => {
          const opponent = a.id.valueOf() as number;
          setSelectedOpponent(opponent);

          if (
            opponents[opponent].matches &&
            opponents[opponent].matches!.length > 0
          ) {
            setSelectedMatch(0);
            setDialogOpen(true);
          }
        }}
      />
      <Dialog
        open={dialogOpen}
        fullScreen={fullScreen}
        onClose={() => {
          setDialogOpen(false);
        }}
      >
        <Box sx={{ margin: 2 }}>
          {opponents &&
          opponents.length > 0 &&
          opponents[selectedOpponent].matches &&
          opponents[selectedOpponent].matches!.length > 0 ? (
            <Stack sx={{ alignItems: 'center' }}>
              <Tabs
                value={selectedMatch}
                onChange={(e, v) => {
                  setSelectedMatch(v);
                }}
              >
                {opponents[selectedOpponent].matches!.map((m, i) => {
                  const parsedDate = parseISO(m.date);
                  const formattedDate = format(parsedDate, 'd/M/yy');
                  return (
                    <Tab
                      key={`${opponents[selectedOpponent].opponentId}-${i}`}
                      label={formattedDate}
                    />
                  );
                })}
              </Tabs>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    label="Strength #1"
                    contentEditable={false}
                    value={stringOrNA(
                      opponents[selectedOpponent].matches![selectedMatch]
                        .performance.strength1
                    )}
                    margin="normal"
                    fullWidth={true}
                  />
                  <TextField
                    label="Strength #2"
                    contentEditable={false}
                    value={stringOrNA(
                      opponents[selectedOpponent].matches![selectedMatch]
                        .performance.strength2
                    )}
                    margin="normal"
                    fullWidth={true}
                  />
                  <TextField
                    label="Strength #3"
                    contentEditable={false}
                    value={stringOrNA(
                      opponents[selectedOpponent].matches![selectedMatch]
                        .performance.strength3
                    )}
                    margin="normal"
                    fullWidth={true}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Weakness #1"
                    contentEditable={false}
                    value={stringOrNA(
                      opponents[selectedOpponent].matches![selectedMatch]
                        .performance.weakness1
                    )}
                    margin="normal"
                    fullWidth={true}
                  />
                  <TextField
                    label="Weakness #2"
                    contentEditable={false}
                    value={stringOrNA(
                      opponents[selectedOpponent].matches![selectedMatch]
                        .performance.weakness2
                    )}
                    margin="normal"
                    fullWidth={true}
                  />
                  <TextField
                    label="Weakness #3"
                    contentEditable={false}
                    value={stringOrNA(
                      opponents[selectedOpponent].matches![selectedMatch]
                        .performance.weakness3
                    )}
                    margin="normal"
                    fullWidth={true}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="How to beat"
                    contentEditable={false}
                    value={stringOrNA(
                      opponents[selectedOpponent].matches![selectedMatch]
                        .performance.changeForNextTime
                    )}
                    margin="normal"
                    fullWidth={true}
                    multiline
                    rows={7}
                  />
                </Grid>
              </Grid>
              <Button onClick={() => setDialogOpen(false)}>Close</Button>
            </Stack>
          ) : (
            <></>
          )}
        </Box>
      </Dialog>
    </>
  );
};

export default Opponents;
