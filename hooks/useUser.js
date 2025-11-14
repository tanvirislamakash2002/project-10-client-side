import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxios from './useAxios';

const useUser = () => {
    const { user, loading: authLoading } = useAuth();
    const axiosSecure = useAxios();

    const { data: userInfo = null, isLoading, refetch } = useQuery({
        queryKey: ['user', user?.email],
        enabled: !authLoading && !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}`);
            return res.data;
        },
    });

    return  userInfo ;
};

export default useUser;
