import * as React from 'react';
import Router from 'next/router';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid/DataGrid';
import {
  GridColDef,
  GridRowId,
  GridRowModel,
  GridRowModes,
  GridRowModesModel
} from '@mui/x-data-grid/models';
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
import {
  useOpponentsStats,
  invalidateOpponentsStats
} from '@/hooks/useOpponentsStats';
import Button from '@mui/material/Button';
import { GridActionsCellItem } from '@mui/x-data-grid/components';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import { useQueryClient } from 'react-query';
import { updateOpponent, deleteOpponent } from '@/lib/api';

function stringOrNA(value: string) {
  return value ? value : 'N/A';
}

const Opponents = () => {
  const user = useUser();
  const { isLoading, data } = useOpponentsStats();
  const queryClient = useQueryClient();
  const [selectedOpponent, setSelectedOpponent] = React.useState<
    OpponentStatsDTO | undefined
  >(undefined);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [selectedMatch, setSelectedMatch] = React.useState<number>(0);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {}
  );

  const opponents = data ? (data as OpponentStatsDTO[]) : [];

  const initialRows = opponents.map((o) => {
    return {
      id: o.opponentId,
      name: o.opponentName,
      forehand: o.forehand === 'Right-handed' ? '🫱' : '🫲',
      backhand: o.backhand === 'One-handed' ? '🤚' : '🫱🫲',
      winrate: o.winRate
    };
  });

  const [rows, setRows] = React.useState(initialRows);

  if (user.isLoading) {
    return <LoadingSpinner />;
  }

  if (!user.user) {
    Router.push('/signin');
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => async () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: GridRowId) => async () => {
    await deleteOpponent(id as string);
    invalidateOpponentsStats(queryClient);
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true }
    });
  };

  const processRowUpdate = async (newRow: GridRowModel) => {
    const updatedRow = newRow as any;

    if (updatedRow?.name) {
      await updateOpponent({
        id: updatedRow.id as string,
        name: updatedRow.name
      });
      invalidateOpponentsStats(queryClient);
      setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    }

    return updatedRow;
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID' },
    {
      field: 'name',
      headerName: 'Name',
      editable: true
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
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              key={0}
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: 'primary.main'
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              key={1}
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />
          ];
        }

        return [
          <GridActionsCellItem
            key={0}
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            key={1}
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />
        ];
      }
    }
  ];

  return (
    <>
      <DataGrid
        rows={rows}
        columns={columns}
        autoHeight
        sx={{ marginBottom: 5, width: 'auto' }}
        disableRowSelectionOnClick
        rowModesModel={rowModesModel}
        processRowUpdate={processRowUpdate}
        onRowModesModelChange={(newRowModesModel: GridRowModesModel) =>
          setRowModesModel(newRowModesModel)
        }
        columnVisibilityModel={{
          id: false
        }}
        onRowClick={(a) => {
          const opponentId = a.id.valueOf() as string;

          const opponent = opponents.find((o) => o.opponentId === opponentId);

          if (opponent && opponent.matches && opponent.matches!.length > 0) {
            setSelectedOpponent(opponent);
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
          selectedOpponent &&
          selectedOpponent.matches &&
          selectedOpponent.matches!.length > 0 ? (
            <Stack sx={{ alignItems: 'center' }}>
              <Tabs
                value={selectedMatch}
                onChange={(e, v) => {
                  setSelectedMatch(v);
                }}
              >
                {selectedOpponent.matches!.map((m, i) => {
                  const parsedDate = parseISO(m.date);
                  const formattedDate = format(parsedDate, 'd/M/yy');
                  return (
                    <Tab
                      key={`${selectedOpponent.opponentId}-${i}`}
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
                      selectedOpponent.matches![selectedMatch].performance
                        .strength1
                    )}
                    margin="normal"
                    fullWidth={true}
                  />
                  <TextField
                    label="Strength #2"
                    contentEditable={false}
                    value={stringOrNA(
                      selectedOpponent.matches![selectedMatch].performance
                        .strength2
                    )}
                    margin="normal"
                    fullWidth={true}
                  />
                  <TextField
                    label="Strength #3"
                    contentEditable={false}
                    value={stringOrNA(
                      selectedOpponent.matches![selectedMatch].performance
                        .strength3
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
                      selectedOpponent.matches![selectedMatch].performance
                        .weakness1
                    )}
                    margin="normal"
                    fullWidth={true}
                  />
                  <TextField
                    label="Weakness #2"
                    contentEditable={false}
                    value={stringOrNA(
                      selectedOpponent.matches![selectedMatch].performance
                        .weakness2
                    )}
                    margin="normal"
                    fullWidth={true}
                  />
                  <TextField
                    label="Weakness #3"
                    contentEditable={false}
                    value={stringOrNA(
                      selectedOpponent.matches![selectedMatch].performance
                        .weakness3
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
                      selectedOpponent.matches![selectedMatch].performance
                        .changeForNextTime
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
