window.electron = require('electron');

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    minimize: () => ipcRenderer.send('minimize'),
    maximize: () => ipcRenderer.send('maximize'),
    close: () => ipcRenderer.send('close'),
    getSystemInfo: () => ipcRenderer.invoke('get-system-info'),
});
// console.log('Preload cargado')