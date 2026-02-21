import { useMutation } from "@tanstack/react-query"
import useAxios from "../useAxios";

const useJwtToken = () => {
    const axiosInstance = useAxios()
    return  useMutation({
        mutationFn: (email) => {
            console.log(email);
           return axiosInstance.post(`/api/v1/auth/login`, {email})
        },
        onSuccess: ({data}) => {
            localStorage.setItem('token', data.token)
        },
        onError: (error) => {
            console.error('JWT fetch error:', error.response);
        }
    })
}

export default useJwtToken;