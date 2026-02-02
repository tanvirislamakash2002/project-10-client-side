// hooks/useListingsQuery.js (NEW FILE)
import { useQuery } from '@tanstack/react-query';
import useAxios from './useAxios';
import { prepareFiltersForAPI } from '../utils/filterUtils';

export const useListingsQuery = (filters = {}) => {
  const axiosInstance = useAxios();
  console.log(filters);
  return useQuery({
    queryKey: ['listings', filters], 
    queryFn: async () => {
      const apiFilters = prepareFiltersForAPI(filters);
      
      const response = await axiosInstance.get('/api/v1/listings', {
        params: apiFilters
      });
      
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
    retry: 2,
    keepPreviousData: true
  });
};