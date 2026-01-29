import axios from 'axios';
import React from 'react';
import config from '../config/index.js';

const axiosInstance = axios.create({
    baseURL: config.baseUrl
})
const useAxios = () => {
    return axiosInstance;
};

export default useAxios;