import useSWR from 'swr';
import { fetcher } from '@/utils/fetch';
import { BikeShareResponse } from '@/types';

export const useFetchBikeShare = () => {
  return useSWR<BikeShareResponse>(
    'https://geo.dot.gov/server/rest/services/Hosted/Bikeshare_Scooter_Systems_DS/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json',
    fetcher,
  );
};
