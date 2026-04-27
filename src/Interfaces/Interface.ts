declare global {

    interface SystemInfo {
    arch: string, 
    chromeVersion: string, 
    electronVersion: string, 
    platform: string, 
    release: string
}

    interface Window {
        electronAPI?: {
            minimize?: () => void;
            maximize?: () => void;
            close?: () => void;
            getSystemInfo?: () => SystemInfo
        };
    }
}
