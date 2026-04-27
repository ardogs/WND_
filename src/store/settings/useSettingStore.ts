import { create } from "zustand";
import i18n from '../../lib/i18n';
import { fetchAppSettingsAPI, isConnectedAPI, setDarkModeAPI, apiLogin, setAPIUrl, setFontsize, setLanguage } from "../../api/settings";
import { useAuthStore } from "./useAuthStore";

interface SettingsState {
    darkmode: boolean,
    fontSize: number,
    language: string,
    apiURL: string,
    apiPWD: string,
    apiToken: string,
    statusConnection: boolean,

    apiVersion: string,
    uiVersion: string,
    electronVersion: string,
    chromeVersion: string,
    osType: string
    osVersion: string
    osArch: string

    error: string,
    fontSizeisLoading: boolean,
    darkmodeisLoading: boolean,
    languageisLoading: boolean,
    apiURLisLoading: boolean,
    apiPWDisLoading: boolean
    statusConnectionisLoading: boolean,
    appisLoading: boolean,
    appLoaded: boolean
}

interface SettingsActions {
    setDarkMode: (flag: boolean) => void
    changeLanguage: (langauge: string) => void
    setAPIURL: (url: string) => void,
    setTokenAPI: (pwd: string) => void,
    setStatusConnection: () => void,
    getSystemInfo: () => void,
    setFontSize: (size: number) => void;
    fetchAppSettings: (token: string) => void
}

export const useSettingsStore = create<SettingsState & SettingsActions>((set, get) => ({
    darkmode: true,
    fontSize: 15,
    language: 'es',
    apiURL: 'http://localhost:3000',
    apiToken: '',

    apiVersion: "-",
    uiVersion: '-',
    apiPWD: "-",
    electronVersion: '-',
    chromeVersion: '-',
    osType: '-',
    osVersion: '-',
    osArch: '-',

    error: "",

    apiPWDisLoading: false,
    fontSizeisLoading: false,
    statusConnection: false,
    darkmodeisLoading: false,
    languageisLoading: false,
    apiURLisLoading: false,
    statusConnectionisLoading: false,
    appisLoading: false,
    appLoaded: false,

    fetchAppSettings: async (token: string) => {
        set({ appisLoading: true, error: "" })
        try {
            const data = await fetchAppSettingsAPI(token);

            set({ darkmode: data?.darkMode, apiVersion: data?.apiVersion, language: data?.language.toLowerCase(), apiURL: data?.apiUrl, apiToken: token, fontSize: data?.fontSize })
            get().setStatusConnection();
            i18n.changeLanguage(get().language)
            
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            set({ error: errorMessage, appisLoading: false });
        }
    },

    setDarkMode: async () => {
        set({ darkmodeisLoading: true, error: "" })
        try {

            const currentMode = get().darkmode;
            // console.log(!currentMode)
            await setDarkModeAPI(!currentMode, get().apiToken);
            set((state) => ({ darkmode: !state.darkmode, darkmodeisLoading: false }))
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            set({ error: errorMessage, darkmodeisLoading: false });
        }
    },

    changeLanguage: async (value: string) => {
        set({ languageisLoading: true, error: "" })
        try {
            await setLanguage(get().apiToken, value)
            i18n.changeLanguage(value)
            set({ language: value, languageisLoading: false })
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            set({ error: errorMessage, languageisLoading: false });
        }
    },

    setFontSize: async (size: number) => {
        set({ fontSizeisLoading: true, error: "" })
        try {
            set({ fontSize: size })
            await setFontsize(get().apiToken, size)
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            set({ error: errorMessage, fontSizeisLoading: false });
        }
    },

    setAPIURL: async (value: string) => {
        set({ apiURLisLoading: true, error: "" })
        try {
            await setAPIUrl(get().apiToken, value)
            set({ apiURL: value, apiURLisLoading: false })
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            set({ error: errorMessage, apiURLisLoading: false });
        }
    },

    setTokenAPI: async (pwd: string) => {
        try {
            set({ apiPWD: pwd })
            const token = await apiLogin(pwd);
            if (token) {
                console.log(token)
                set({ apiToken: token })
                useAuthStore.getState().setToken(token)
            }

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            set({ error: errorMessage, apiPWDisLoading: false });
        }
    },



    setStatusConnection: async () => {
        set({ statusConnectionisLoading: true, error: "" })
        try {
            const data = await isConnectedAPI(get().apiToken);
            if (data === 200)
                set({ statusConnection: true, statusConnectionisLoading: false })
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            set({ statusConnection: false, error: errorMessage, statusConnectionisLoading: false });
        }
    },

    getSystemInfo: async () => {
        set({ appisLoading: true, error: "" })
        try {
            if (!window?.electronAPI?.getSystemInfo) return;
            const { arch, chromeVersion, electronVersion, platform, release } = await window.electronAPI.getSystemInfo();
            set({
                electronVersion: electronVersion,
                chromeVersion: chromeVersion,
                osType: platform,
                osVersion: release,
                osArch: arch,
            })
            set({ appisLoading: false, error: "", appLoaded: true });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            set({ appisLoading: false, error: errorMessage });
        }
    }

}));

