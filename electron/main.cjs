// electron/main.js
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const os = require('os');

// Detecta si estamos en modo de desarrollo
const isDev = process.env.NODE_ENV !== 'production';

function createWindow() {
    const win = new BrowserWindow({
        width: 1280,
        height: 800,
        minHeight: 1000,
        minWidth: 1500,
        // backgroundMaterial: 'acrylic',
        // transparent: true,
        // blur: true,
        frame: false,
        webPreferences: {

            preload: path.join(__dirname, 'preload.js'), 
            nodeIntegration: true, 
            contextIsolation: true,
        },
        autoHideMenuBar: true,
    });

    win.maximize();

    // Si estamos en desarrollo, carga la URL del servidor de Vite.
    // Si estamos en producción, carga el archivo index.html compilado.
    if (isDev) {
        win.loadURL('http://localhost:5173'); // Puerto por defecto de Vite
        // win.webContents.openDevTools(); // Abre las herramientas de desarrollador
    } else {
        win.loadFile(path.join(__dirname, '../dist/index.html'));
    }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

ipcMain.on('minimize', () => {
    console.log('Minimize')
    BrowserWindow.getFocusedWindow()?.minimize();
});

ipcMain.on('maximize', () => {
    const win = BrowserWindow.getFocusedWindow();
    if (win.isMaximized()) {
        win.unmaximize();
    } else {
        win.maximize();
    }
});

ipcMain.on('close', () => {
    BrowserWindow.getFocusedWindow()?.close();
});

ipcMain.handle('get-system-info', () => {
    // Recopilamos la información que necesitamos del módulo 'os'
    const systemInfo = {
        platform: os.platform(), // 'win32', 'darwin' (macOS), 'linux'
        release: os.release(),   // Versión del S.O.
        arch: os.arch(),         // 'x64', 'arm64', etc.
        cpuModel: os.cpus()[0].model, // Modelo del primer núcleo de CPU
        cpuCores: os.cpus().length,   // Número de núcleos
        totalMemory: (os.totalmem() / 1024 / 1024 / 1024).toFixed(2), // Memoria total en GB
        freeMemory: (os.freemem() / 1024 / 1024 / 1024).toFixed(2),   // Memoria libre en GB
        userInfo: os.userInfo(),     // Información del usuario (username, home dir)
        electronVersion: process.versions.electron, // Versión de Electron
        chromeVersion: process.versions.chrome,     // Versión de Chromium
    };
    return systemInfo;
});