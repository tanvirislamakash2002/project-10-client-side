import axios from 'axios';
import React from 'react';
import { config } from '../src/config';

const axiosInstance = axios.create({
    baseURL: config.API_URL
})

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token')
        if (token) { config.headers.Authorization = `Bearer ${token}` }
        return config;
    },
    (error) => Promise.reject(error)
)

const useAxios = () => {
    return axiosInstance;
};

export default useAxios;