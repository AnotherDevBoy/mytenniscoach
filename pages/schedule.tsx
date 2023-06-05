import * as React from 'react';
import Router from 'next/router';
import { Scheduler } from '@aldabil/react-scheduler';
import { ProcessedEvent } from '@aldabil/react-scheduler/types';
import { EventDTO, OpponentDTO } from '@/lib/types';
import ScheduleEventEditor from '@/components/ScheduleEventEditor';
import { toProcessedEvent } from '@/lib/convert';
import { deleteEvent } from '@/lib/api';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useUser } from '@/utils/useUser';
import { useSnackbar } from 'notistack';
import { useOpponents, invalidateOpponents } from '@/hooks/useOpponents';
import { useQueryClient } from 'react-query';
import { useLocations } from '@/hooks/useLocations';
import { invalidateEvents, useEvents } from '@/hooks/useEvents';

const Schedule = () => {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  const user = useUser();

  const eventsHook = useEvents();
  const opponentsHook = useOpponents();
  const locationsHook = useLocations();

  const opponents = opponentsHook.data as OpponentDTO[];
  const locations = locationsHook.data as string[];

  const events = eventsHook.data as EventDTO[];
  const processedEvents =
    events && events.length > 0
      ? (events.map((e: EventDTO) =>
          toProcessedEvent(e, opponents)
        ) as ProcessedEvent[])
      : [];

  React.useEffect(() => {
    if (!user.isLoading && !user.user) {
      Router.push('/signin');
    }
  }, [user]);

  async function onDeleteEvent(id: string | number): Promise<string | number> {
    await deleteEvent(id as string);
    enqueueSnackbar('Event Deleted', {
      variant: 'success',
      anchorOrigin: { horizontal: 'center', vertical: 'bottom' }
    });
    return id;
  }

  if (
    !user.user ||
    opponentsHook.isLoading ||
    locationsHook.isLoading ||
    eventsHook.isLoading
  ) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Scheduler
        view="month"
        onDelete={onDeleteEvent}
        events={processedEvents}
        customEditor={(scheduler) => (
          <ScheduleEventEditor
            scheduler={scheduler}
            opponents={opponents}
            locations={locations}
            onComplete={async () => {
              enqueueSnackbar('Event Created', {
                variant: 'success',
                anchorOrigin: { horizontal: 'center', vertical: 'bottom' }
              });
              invalidateEvents(queryClient);
              invalidateOpponents(queryClient);
            }}
          />
        )}
      />
    </>
  );
};

export default Schedule;
