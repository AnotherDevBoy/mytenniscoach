import { QueryClient, useQuery } from 'react-query';

import { getEvents } from '@/lib/api';

const useEvents = () => {
  return useQuery('events', getEvents);
};

const invalidateEvents = (queryClient: QueryClient) => {
  queryClient.invalidateQueries('events');
};

export { useEvents, invalidateEvents };
