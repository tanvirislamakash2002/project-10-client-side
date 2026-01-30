// hooks/useFavorite.js - FOR SINGLE LISTING ONLY
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
            const res = await axiosInstance.get(`/api/v1/favorites/check?userEmail=${userEmail}&listingId=${listingId}`);
            return res.data.isFavorite;
        },
        enabled: !!userEmail && !!listingId,
        staleTime: 5 * 60 * 1000,
    });

    // Toggle favorite mutation
    const mutation = useMutation({
        mutationFn: async () => {
            const res = await axiosInstance.post('/api/v1/favorites/toggle', {
                userEmail,
                listingId,
            });
            return res.data;
        },
        onSuccess: (data) => {
            toast.success(data.message);
            queryClient.invalidateQueries(['favorite', listingId, userEmail]);
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