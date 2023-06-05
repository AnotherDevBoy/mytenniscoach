import * as React from 'react';
import Router from 'next/router';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import Dialog from '@mui/material/Dialog';
import SubmitMatchResultForm, {
  SubmitMatchResultFormData
} from '@/components/SubmitMatchResultForm';
import { submitEventData } from '@/lib/api';
import { EventDTO, EventType, MatchEventData, OpponentDTO } from '@/lib/types';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useUser } from '@/utils/useUser';
import { useSnackbar } from 'notistack';
import { useEvents, invalidateEvents } from '@/hooks/useEvents';
import { useOpponents } from '@/hooks/useOpponents';
import { useQueryClient } from 'react-query';

const Matches = () => {
  const user = useUser();
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const eventsHook = useEvents();
  const opponentsHook = useOpponents();
  const [displayOldMatches, setDisplayOldMatches] = React.useState(true);
  const [submitMatchResultModalOpen, setSubmitMatchResultModalOpen] =
    React.useState(false);
  const [selectedEvent, setSelectedEvent] = React.useState<
    EventDTO | undefined
  >(undefined);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  if (user.isLoading) {
    return <LoadingSpinner />;
  }

  if (!user.user) {
    Router.push('/signin');
  }

  const opponents = opponentsHook.data
    ? (opponentsHook.data as OpponentDTO[])
    : [];
  const events = eventsHook.data ? (eventsHook.data as EventDTO[]) : [];

  const now = new Date();

  const rows = events
    .filter((e) => e.type === EventType.Match)
    .filter((e: EventDTO) =>
      displayOldMatches ? new Date(e.start) < now : new Date(e.start) >= now
    )
    .map((e: EventDTO) => {
      const opponentName =
        opponents.find((o) => o.id === e.opponentId)?.name || '';

      return {
        id: e.id,
        date: e.start,
        opponent: opponentName,
        played: displayOldMatches && e.data ? '✅' : '❌'
      };
    }) as GridRowsProp;

  async function sendMatchResult(
    event: EventDTO,
    data: SubmitMatchResultFormData
  ) {
    const eventData: MatchEventData = {
      summary: {
        score: data.score,
        win: data.winLoss === '1',
        duration: data.duration,
        rainLevel: data.rainLevel,
        windLevel: data.windLevel,
        courtSpeed: data.courtSpeed,
        surface: data.surface.label
      },
      opponentPeformance: {
        forehand: data.forehand.label,
        backhand: data.backhand.label,
        strength1: data.strength1,
        strength2: data.strength2,
        strength3: data.strength3,
        weakness1: data.weakness1,
        weakness2: data.weakness2,
        weakness3: data.weakness3,
        changeForNextTime: data.changeForNextTime
      },
      performance: {
        technical: data.technical,
        technicalNotes: data.technicalNotes,
        tactical: data.tactical,
        tacticalNotes: data.tacticalNotes,
        physical: data.physical,
        physicalNotes: data.physicalNotes,
        mental: data.mental,
        mentalNotes: data.mentalNotes,
        lesson: data.lesson
      }
    };

    await submitEventData(event.id, eventData);

    invalidateEvents(queryClient);
  }

  if (opponentsHook.isLoading || eventsHook.isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
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
        sx={{ marginBottom: 5 }}
        columnVisibilityModel={{
          id: false
        }}
        disableRowSelectionOnClick={true}
        onRowClick={(rowClicked) => {
          if (displayOldMatches) {
            setSubmitMatchResultModalOpen(true);

            const maybeEvent = events.find(
              (e) => e.id === rowClicked.id.toString()
            )!;
            setSelectedEvent(maybeEvent);
          }
        }}
      />
      <Dialog
        open={submitMatchResultModalOpen}
        fullScreen={fullScreen}
        onClose={() => setSubmitMatchResultModalOpen(false)}
      >
        <SubmitMatchResultForm
          event={selectedEvent!}
          onFormCompleted={async (data) => {
            setSubmitMatchResultModalOpen(false);
            await sendMatchResult(selectedEvent!, data);
            enqueueSnackbar('Match result saved', {
              variant: 'success',
              anchorOrigin: { horizontal: 'center', vertical: 'bottom' }
            });
          }}
        />
      </Dialog>
    </>
  );
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
    field: 'opponent',
    headerName: 'Opponent',
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
export default Matches;
