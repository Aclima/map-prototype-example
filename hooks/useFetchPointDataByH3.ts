import useSWR from 'swr';
import { fetcher } from '@/utils/fetch';

export const useFetchPointDataByH3 = ({pollutant, h3Id}) => {
  return useSWR<{timestamp: string, value: string}[]>({ url: '/api/point-data-for-h3', args: {modality: pollutant, h3Id} }, fetcher);
};
