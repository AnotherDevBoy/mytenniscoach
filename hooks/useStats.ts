import { useQuery } from 'react-query';

import { getStats } from '@/lib/api';

const useStats = () => {
  return useQuery('stats', getStats);
};

export { useStats };
