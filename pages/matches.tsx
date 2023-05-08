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
import MatchResultForm, {
  MatchFormData
} from '@/components/matchForm/MatchResultForm';
import { getEvents, getOpponents, submitEventData } from '@/lib/api';
import { EventDTO, EventData, MatchEventData, OpponentDTO } from '@/lib/types';

const Matches = () => {
  const user = useUser();

  const [displayOldMatches, setDisplayOldMatches] = React.useState(true);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [selectedEvent, setSelectedEvent] = React.useState('');
  const [events, setEvents] = React.useState<EventDTO[]>([]);
  const [opponents, setOpponents] = React.useState<OpponentDTO[]>([]);

  React.useEffect(() => {
    if (!user) {
      Router.push('/signin');
    }

    getOpponents()
      .then((existingOpponents) => {
        setOpponents(existingOpponents);
        return getEvents();
      })
      .then((existingEvents) => {
        setEvents(existingEvents);
      });
  }, [user]);

  const now = new Date();

  const rows = events
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

  async function sendMatchResult(eventId: string, data: MatchFormData) {
    const eventData: MatchEventData = {
      summary: {
        score: data.score,
        win: data.winLoss === 'Win',
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

    await submitEventData(eventId, eventData);

    const refreshedEvents = await getEvents();
    setEvents(refreshedEvents);
  }

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
              disableRowSelectionOnClick={true}
              onRowClick={(rowClicked) => {
                const played = rowClicked.row.played;

                if (displayOldMatches && played === '❌') {
                  setModalOpen(true);
                  setSelectedEvent(rowClicked.id.toString());
                }
              }}
            />
            <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
              <MatchResultForm
                onFormCompleted={async (data) => {
                  setModalOpen(false);
                  await sendMatchResult(selectedEvent, data);
                }}
              />
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
