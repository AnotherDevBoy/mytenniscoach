import * as React from 'react';
import Router from 'next/router';
import { Scheduler } from '@aldabil/react-scheduler';
import { ProcessedEvent, ViewEvent } from '@aldabil/react-scheduler/types';

import { EventDTO, OpponentDTO } from '@/lib/types';
import ScheduleEventEditor from '@/components/ScheduleEventEditor';
import { toProcessedEvent } from '@/lib/convert';
import { getEvents, deleteEvent, getOpponents } from '@/lib/api';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useUser } from '@/utils/useUser';
import { useSnackbar } from 'notistack';
import useAsyncError from '@/lib/errorHandling';
import { useOpponents, invalidateOpponents } from '@/hooks/useOpponents';
import { useQueryClient } from 'react-query';
import { useLocations } from '@/hooks/useLocations';

const Schedule = () => {
  const throwError = useAsyncError();
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  const user = useUser();

  const opponentsHook = useOpponents();
  const locationsHook = useLocations();

  const opponents = opponentsHook.data as OpponentDTO[];
  const locations = locationsHook.data as string[];

  React.useEffect(() => {
    if (!user.isLoading && !user.user) {
      Router.push('/signin');
    }
  }, [user]);

  const getScheduledEvents = async (
    _: ViewEvent
  ): Promise<ProcessedEvent[] | void> => {
    try {
      return (await getEvents()).map((e: EventDTO) =>
        toProcessedEvent(e, opponents)
      ) as ProcessedEvent[];
    } catch (e) {
      throwError(e as Error);
    }
  };

  async function onDeleteEvent(id: string | number): Promise<string | number> {
    await deleteEvent(id as string);
    enqueueSnackbar('Event Deleted', {
      variant: 'success',
      anchorOrigin: { horizontal: 'center', vertical: 'bottom' }
    });
    return id;
  }

  if (!user.user || opponentsHook.isLoading || locationsHook.isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Scheduler
        view="month"
        onDelete={onDeleteEvent}
        getRemoteEvents={getScheduledEvents}
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
              invalidateOpponents(queryClient);
            }}
          />
        )}
      />
    </>
  );
};

export default Schedule;
