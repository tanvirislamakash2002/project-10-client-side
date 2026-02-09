import { useMutation } from "@tanstack/react-query"
import useAxios from "../useAxios"

const postJWT = async (email) => {
    const axiosInstance = useAxios()
    const { data } = await axiosInstance.post(`/api/v1/auth`, email)
    return data
}

export const useJwtToken = () => {
    return useMutation({
        mutationFn: postJWT,
        onSuccess: (data) => {
            localStorage.setItem('token', data.token)
        },
        onError: (error) => {
            console.error('JWT fetch error:', error);
        }
    })
}