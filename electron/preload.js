const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    minimize: () => ipcRenderer.send('minimize'),
    maximize: () => ipcRenderer.send('maximize'),
    close: () => ipcRenderer.send('close'),
    getSystemInfo: () => ipcRenderer.invoke('get-system-info'),
    openFile: (filePath) => ipcRenderer.invoke('open-file', filePath),
    showInFolder: (filePath) => ipcRenderer.invoke('show-in-folder', filePath),
});