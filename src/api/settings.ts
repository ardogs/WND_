import { axiosInstance } from "../providers/api/axiosInstance";
import { AppSettings } from "./types";


export const fetchAppSettingsAPI = async (token: string): Promise<AppSettings | undefined> => {
    try {
        const response = await axiosInstance.get('/api/settings', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error(error)
    }
}

export const apiLogin = async(pwd: string): Promise<string | undefined> => {
    try {
        const data = { "password": pwd }
        const response = await axiosInstance.post('/api/auth/login', data)
        return (response).data.token;
    } catch (error) {
        console.error(error)
    }
}

export const setAPIUrl = async(token: string, apiURL: string): Promise<string | undefined> => {
    try {
        const data = { "apiUrl": apiURL }
        const response = await axiosInstance.patch('/api/settings/apiUrl', data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        // console.log(response)
        
        return response.data;
    } catch (error) {
        console.error(error)
    }
}

export const isConnectedAPI = async (token: string): Promise<number | undefined> => {
    try {
        const response = await axiosInstance.get('/api/test/ping', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.status;
    } catch (error) {
        console.error(error)
    }
}

export const setDarkModeAPI = async (activated: boolean, token: string): Promise<string | undefined> => {
    try {
        const response = await axiosInstance.patch('/api/settings/darkmode', { "darkMode": activated }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data
    } catch (error) {
        console.error({error})
    }
}

export const setFontsize = async(token: string, fontsize: number): Promise<string | undefined> => {
    try {
        const data = { "fontSize": fontsize }
        const response = await axiosInstance.patch('/api/settings/fontsize', data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        // console.log(response)
        return response.data;
    } catch (error) {
        console.error(error)
    }
}

export const setLanguage = async(token: string, language: string): Promise<string | undefined> => {
    try {
        const data = { "language": language.toUpperCase() }
        const response = await axiosInstance.patch('/api/settings/language', data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        // console.log(response)
        return response.data;
    } catch (error) {
        console.error(error)
    }
}