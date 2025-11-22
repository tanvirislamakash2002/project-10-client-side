import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxios from './useAxios';

const useUser = (email) => {
    const { user, loading: authLoading } = useAuth();
    const axiosSecure = useAxios();

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
            const res = await axiosSecure.get(`/users/${targetEmail}`);
            return res.data;
        },
    });

    // console.log('useUser debug:', { email, targetEmail, userInfo });

    return userInfo; 
};

export default useUser;