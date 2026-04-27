import axios from 'axios';
import { useSettingsStore } from '../../store/settings/useSettingStore';

export const axiosInstance = axios.create({
    // baseURL: useSettingsStore.getState().apiURL, // API de ejemplo
    timeout: 1000,
    
    headers: {
        'Content-Type': 'application/json',
    },
});

// 2. Agrega un interceptor para inyectar la URL justo antes de cada llamada
axiosInstance.interceptors.request.use(
    (config) => {
        // Al acceder al store aquí dentro, nos aseguramos de que el store
        // ya está inicializado porque esto corre cuando llamas a la API,
        // no cuando carga el archivo.
        const apiURL = useSettingsStore.getState().apiURL;

        if (apiURL) {
            config.baseURL = apiURL;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
