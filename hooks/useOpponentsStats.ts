import { useQuery } from 'react-query';

import { getOpponentsStats } from '@/lib/api';

const useOpponentsStats = () => {
  return useQuery('opponentsStats', getOpponentsStats);
};

export { useOpponentsStats };
