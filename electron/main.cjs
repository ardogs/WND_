// electron/main.cjs
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const os = require('os');
const fs = require('fs');
const dotenv = require('dotenv');

// Detecta si estamos en modo de desarrollo
const isDev = process.env.NODE_ENV !== 'production';

// Carga de variables de entorno (.env)
const envPath = isDev 
    ? path.join(__dirname, '../.env') 
    : path.join(process.resourcesPath, '.env');

if (fs.existsSync(envPath)) {
    dotenv.config({ path: envPath });
} else {
    dotenv.config({ path: path.join(__dirname, '../.env') });
}

// Importar el backend compilado de Express
let serverModule = null;
try {
    serverModule = require('./dist/server.js');
} catch (err) {
    console.warn('⚠️ electron/dist/server.js no encontrado o falló al cargar. Compila con npm run build:server.', err.message);
}

function createWindow() {
    const win = new BrowserWindow({
        width: 1280,
        height: 800,
        minHeight: 1000,
        minWidth: 1500,
        frame: false,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'), 
            nodeIntegration: false, 
            contextIsolation: true,
        },
        autoHideMenuBar: true,
    });

    win.maximize();

    // Si estamos en desarrollo, carga la URL del servidor de Vite.
    // Si estamos en producción, carga el archivo index.html compilado.
    if (isDev) {
        win.loadURL('http://localhost:5173');
    } else {
        win.loadFile(path.join(__dirname, '../dist/index.html'));
    }
}

app.whenReady().then(async () => {
    // Inicializar servidor Express en segundo plano
    if (serverModule && typeof serverModule.startServer === 'function') {
        try {
            await serverModule.startServer();
            console.log('✅ Servidor Express backend inicializado en Electron');
        } catch (error) {
            console.error('❌ Error al iniciar el servidor Express backend:', error);
        }
    }

    createWindow();
});

app.on('window-all-closed', async () => {
    if (serverModule && typeof serverModule.stopServer === 'function') {
        try {
            await serverModule.stopServer();
        } catch (error) {
            console.error('Error al detener servidor:', error);
        }
    }
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// IPC Handlers existentes
ipcMain.on('minimize', () => {
    BrowserWindow.getFocusedWindow()?.minimize();
});

ipcMain.on('maximize', () => {
    const win = BrowserWindow.getFocusedWindow();
    if (win?.isMaximized()) {
        win.unmaximize();
    } else {
        win?.maximize();
    }
});

ipcMain.on('close', () => {
    BrowserWindow.getFocusedWindow()?.close();
});

ipcMain.handle('get-system-info', () => {
    const systemInfo = {
        platform: os.platform(),
        release: os.release(),
        arch: os.arch(),
        cpuModel: os.cpus()[0]?.model || 'Unknown',
        cpuCores: os.cpus().length,
        totalMemory: (os.totalmem() / 1024 / 1024 / 1024).toFixed(2),
        freeMemory: (os.freemem() / 1024 / 1024 / 1024).toFixed(2),
        userInfo: os.userInfo(),
        electronVersion: process.versions.electron,
        chromeVersion: process.versions.chrome,
    };
    return systemInfo;
});