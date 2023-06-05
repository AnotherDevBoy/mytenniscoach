import { QueryClient, useQuery } from 'react-query';

import { getOpponents } from '@/lib/api';

const useOpponents = () => {
  return useQuery('opponents', getOpponents);
};

const invalidateOpponents = (queryClient: QueryClient) => {
  queryClient.invalidateQueries('opponents');
};

export { useOpponents, invalidateOpponents };
