import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxios from './useAxios';

const useUser = (email) => {
    const { user, loading: authLoading } = useAuth();
    const axiosInstance = useAxios();

    // Use the provided email parameter, fallback to user.email
    const targetEmail = email || user?.email;

    const { 
        data: userInfo = null, 
        isLoading, 
        isError, 
        error, 
        refetch 
    } = useQuery({
        queryKey: ['user', targetEmail],
        enabled: !authLoading && !!targetEmail,
        queryFn: async () => {
            const res = await axiosInstance.get(`/api/v1/user/${targetEmail}`);
            return res.data;
        },
    });

    return userInfo; 
};

export default useUser;