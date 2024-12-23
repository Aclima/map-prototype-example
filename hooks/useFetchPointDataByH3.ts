import useSWR from 'swr';
import { fetcher } from '@/utils/fetch';

export const useFetchPointDataByH3 = ({modality, h3Id}) => {
  return useSWR(`/api/point-data-for-h3?modality=${modality}&h3Id=${h3Id}`, fetcher);
};
