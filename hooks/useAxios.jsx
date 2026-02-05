import axios from 'axios';
import React from 'react';
import { config } from '../src/config';

const axiosInstance = axios.create({
    baseURL: config.API_URL
})
const useAxios = () => {
    return axiosInstance;
};

export default useAxios;