import axios from 'axios';
import { useSettingsStore } from '../../store/settings/useSettingStore';

export const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Agrega un interceptor para inyectar la URL configurada dinámicamente
axiosInstance.interceptors.request.use(
    (config) => {
        const apiURL = useSettingsStore.getState().apiURL || 'http://localhost:3000';
        if (apiURL) {
            config.baseURL = apiURL;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
