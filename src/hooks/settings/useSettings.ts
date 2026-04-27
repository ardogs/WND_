import { useShallow } from "zustand/shallow";
import { useSettingsStore } from "../../store/settings/useSettingStore"


export const useSettings = () => {

    const { 
        apiVersion, uiVersion, electronVersion, chromeVersion, osType, osVersion, osArch,
        apiURL, apiURLisLoading, setAPIURL, 
        apiPWD, apiPWDisLoading, setAPIPWD,
        setStatusConnection, statusConnectionisLoading, statusConnection,
        setDarkMode, darkmode, darkmodeisLoading,
        setFontSize, fontSize,
        changeLanguage, language, languageisLoading 
    } = useSettingsStore(
        useShallow((state) => ({
            
            apiVersion: state.apiVersion,
            uiVersion: state.uiVersion,
            electronVersion: state.electronVersion,
            chromeVersion: state.chromeVersion,
            osType: state.osType,
            osVersion: state.osVersion,
            osArch: state.osArch,

            setAPIURL: state.setAPIURL,
            apiURL: state.apiURL,
            apiURLisLoading: state.apiURLisLoading,

            apiPWD: state.apiPWD,
            apiPWDisLoading: state.apiPWDisLoading,
            setAPIPWD: state.setTokenAPI,

            setStatusConnection: state.setStatusConnection, 
            statusConnectionisLoading: state.statusConnectionisLoading, 
            statusConnection: state.statusConnection,

            setDarkMode: state.setDarkMode,
            darkmode: state.darkmode,
            darkmodeisLoading: state.darkmodeisLoading,

            setFontSize: state.setFontSize,
            fontSize: state.fontSize,
            language: state.language,
            languageisLoading: state.languageisLoading,
            changeLanguage: state.changeLanguage,
        }))
    );

    return {
        apiVersion, uiVersion, electronVersion, chromeVersion, osType, osVersion, osArch,

        apiPWD, apiPWDisLoading,
        apiURL, apiURLisLoading,
        statusConnectionisLoading, statusConnection,

        darkmode, darkmodeisLoading,
        fontSize,
        language, languageisLoading,

        handleApiUrl: setAPIURL,
        handleApiPwd: setAPIPWD,
        handleStatusConnection: setStatusConnection,
        handleDarkMode: setDarkMode,
        handleFontSize: setFontSize,
        handleLanguagueChange: changeLanguage
        

    }
}