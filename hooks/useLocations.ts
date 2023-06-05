import { useQuery } from 'react-query';

import { getLocations } from '@/lib/api';

const useLocations = () => {
  return useQuery('locations', getLocations);
};

export { useLocations };
