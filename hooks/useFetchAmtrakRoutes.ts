import useSWR from 'swr';
import { fetcher } from '@/utils/fetch';
import { AmtrakResponse } from '@/types';

export const useFetchAmtrakRoutes = () => {
  return useSWR<AmtrakResponse>('/api/amtrak', fetcher);
};
