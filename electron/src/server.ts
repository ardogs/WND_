import dotenv from 'dotenv';
dotenv.config();

import http from 'http';
import app from './app';
import { connectDB, disconnectDB } from './config/db';
import { seedSuppliers } from './config/seed';

let serverInstance: http.Server | null = null;

export const startServer = async (customPort?: number): Promise<http.Server> => {
    const PORT = customPort || process.env.PORT || 3000;

    const isConnected = await connectDB();
    if (isConnected) {
        await seedSuppliers();
    }

    return new Promise((resolve, reject) => {
        try {
            serverInstance = app.listen(PORT, () => {
                console.log(`🚀 API Express corriendo en http://localhost:${PORT}`);
                resolve(serverInstance!);
            });

            serverInstance.on('error', (err) => {
                console.error('❌ Error en el servidor Express:', err);
                reject(err);
            });
        } catch (error) {
            reject(error);
        }
    });
};

export const stopServer = async (): Promise<void> => {
    if (serverInstance) {
        await new Promise<void>((resolve) => {
            serverInstance!.close(() => {
                console.log('🛑 API Express detenida');
                resolve();
            });
        });
        serverInstance = null;
    }
    await disconnectDB();
};

// Si se ejecuta directamente de forma independiente
if (require.main === module) {
    startServer().catch((err) => {
        console.error('Error al iniciar el servidor:', err);
    });
}