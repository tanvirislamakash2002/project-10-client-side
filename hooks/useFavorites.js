// hooks/useFavorites.js - FOR BULK OPERATIONS
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import useAxios from './useAxios';

export const useFavorites = (userEmail) => {
    const queryClient = useQueryClient();
    const axiosInstance = useAxios();

    // Get all favorites
    const { data: favorites = [], isLoading, error } = useQuery({
        queryKey: ['favorites', userEmail],
        queryFn: async () => {
            const res = await axiosInstance.get(`/favorites?userEmail=${userEmail}`);
            return res.data;
        },
        enabled: !!userEmail,
        staleTime: 5 * 60 * 1000,
    });

    // Remove single favorite by favorite ID
    const removeMutation = useMutation({
        mutationFn: async (favoriteId) => {
            const res = await axiosInstance.delete(`/favorites/${favoriteId}`);
            return res.data;
        },
        onSuccess: (data) => {
            toast.success('Removed from favorites');
            queryClient.invalidateQueries(['favorites', userEmail]);
        },
        onError: () => {
            toast.error('Failed to remove favorite');
        }
    });

    // BULK remove favorites
    const bulkRemoveMutation = useMutation({
        mutationFn: async (favoriteIds) => {
            const res = await axiosInstance.delete('/favorites/bulk', {
                data: { favoriteIds }
            });
            return res.data;
        },
        onSuccess: (data) => {
            toast.success(`Removed ${data.deletedCount} favorites`);
            queryClient.invalidateQueries(['favorites', userEmail]);
        },
        onError: () => {
            toast.error('Failed to remove favorites');
        }
    });

    const removeFavorite = (favoriteId) => {
        removeMutation.mutate(favoriteId);
    };

    const bulkRemoveFavorites = (favoriteIds) => {
        if (favoriteIds.length === 0) {
            toast.error('Please select favorites to remove');
            return;
        }
        bulkRemoveMutation.mutate(favoriteIds);
    };

    return {
        favorites,
        isLoading,
        error,
        removeFavorite, // ✅ NOW RETURNED
        bulkRemoveFavorites, // ✅ RETURNED
        isRemoving: removeMutation.isLoading,
        isBulkRemoving: bulkRemoveMutation.isLoading,
        refetch: () => queryClient.invalidateQueries(['favorites', userEmail])
    };
};