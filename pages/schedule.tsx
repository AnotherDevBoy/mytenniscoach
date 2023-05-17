import * as React from 'react';
import Router from 'next/router';
import { Scheduler } from '@aldabil/react-scheduler';
import { ProcessedEvent, ViewEvent } from '@aldabil/react-scheduler/types';

import { EventDTO, OpponentDTO } from '@/lib/types';
import ScheduleEventEditor from '@/components/schedule/ScheduleEventEditor';
import { toProcessedEvent } from '@/lib/convert';
import { getEvents, deleteEvent, getOpponents } from '@/lib/api';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useUser } from '@/utils/useUser';
import { useSnackbar } from 'notistack';

const Schedule = () => {
  const { enqueueSnackbar } = useSnackbar();

  const [loading, setLoading] = React.useState(true);
  const [opponents, setOpponents] = React.useState<OpponentDTO[]>([]);

  const refreshOpponents = async (): Promise<void> => {
    const receivedOpponents = await getOpponents();
    setOpponents(receivedOpponents);
    setLoading(false);
  };

  React.useEffect(() => {
    refreshOpponents();
  }, []);

  const user = useUser();

  React.useEffect(() => {
    if (!user.isLoading && !user.user) {
      Router.push('/signin');
    }
  }, [user]);

  const getScheduledEvents = async (
    _: ViewEvent
  ): Promise<ProcessedEvent[] | void> => {
    return (await getEvents()).map((e: EventDTO) =>
      toProcessedEvent(e, opponents)
    ) as ProcessedEvent[];
  };

  async function onDeleteEvent(id: string | number): Promise<string | number> {
    await deleteEvent(id as string);
    enqueueSnackbar('Event Deleted', {
      variant: 'success',
      anchorOrigin: { horizontal: 'center', vertical: 'bottom' }
    });
    return id;
  }

  if (user.user && !loading) {
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
              onComplete={async () => {
                setLoading(true);
                enqueueSnackbar('Event Created', {
                  variant: 'success',
                  anchorOrigin: { horizontal: 'center', vertical: 'bottom' }
                });
                await refreshOpponents();
              }}
            />
          )}
        />
      </>
    );
  }

  return <LoadingSpinner />;
};

export default Schedule;
