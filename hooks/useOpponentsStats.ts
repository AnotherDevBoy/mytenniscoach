import { QueryClient, useQuery } from 'react-query';

import { getOpponentsStats } from '@/lib/api';

const useOpponentsStats = () => {
  return useQuery('opponentsStats', getOpponentsStats);
};

const invalidateOpponentsStats = (queryClient: QueryClient) => {
  queryClient.invalidateQueries('opponentsStats');
};

export { useOpponentsStats, invalidateOpponentsStats };
