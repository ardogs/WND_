declare global {

    interface SystemInfo {
        arch: string;
        chromeVersion: string;
        electronVersion: string;
        platform: string;
        release: string;
        cpuModel?: string;
        cpuCores?: number;
        totalMemory?: string;
        freeMemory?: string;
    }

    interface Window {
        electronAPI?: {
            minimize?: () => void;
            maximize?: () => void;
            close?: () => void;
            getSystemInfo?: () => Promise<SystemInfo>;
            openFile?: (filePath: string) => Promise<{ success: boolean; error?: string }>;
            showInFolder?: (filePath: string) => Promise<{ success: boolean; error?: string }>;
        };
    }
}

export {};
