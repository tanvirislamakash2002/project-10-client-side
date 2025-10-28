// hooks/useFavorite.js
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import useAxios from './useAxios';

export const useFavorite = (listingId, userEmail) => {
  const queryClient = useQueryClient();
    const axiosInstance = useAxios()

  // Check if favorite exists
  const { data: isFavorite = false, isLoading } = useQuery({
    queryKey: ['favorite', listingId, userEmail],
    queryFn: async () => {
      const res = await axiosInstance.get(`/favorites/check?userEmail=${userEmail}&listingId=${listingId}`);
      return res.data.isFavorite;
    },
    enabled: !!userEmail && !!listingId
  });

  // Toggle favorite mutation
  const mutation = useMutation({
    mutationFn: async () => {
      const res = await axiosInstance.post('/favorites/toggle', {
        userEmail,
        listingId,
      });
      return res.data;
    },
    onSuccess: (data) => {
      toast.success(data.message);
      // Invalidate and refetch
      queryClient.invalidateQueries(['favorite', listingId, userEmail]);
      // Also invalidate favorites list if you have one
      queryClient.invalidateQueries(['favorites', userEmail]);
    },
    onError: () => {
      toast.error('Failed to update favorite');
    }
  });

  const toggleFavorite = () => {
    if (!userEmail) {
      toast.error('Please login to add favorites');
      return;
    }
    mutation.mutate();
  };

  return {
    isFavorite,
    toggleFavorite,
    isLoading: isLoading || mutation.isLoading,
    isToggling: mutation.isLoading
  };
};