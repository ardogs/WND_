import mongoose from 'mongoose';

export const connectDB = async (): Promise<boolean> => {
    try {
        const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/wnd_db';
        await mongoose.connect(uri);
        console.log('📦 Conectado exitosamente a MongoDB');
        return true;
    } catch (error) {
        console.error('❌ Error al conectar a MongoDB:', error);
        return false;
    }
};

export const disconnectDB = async (): Promise<void> => {
    try {
        if (mongoose.connection.readyState !== 0) {
            await mongoose.disconnect();
            console.log('📦 Desconectado de MongoDB');
        }
    } catch (error) {
        console.error('❌ Error al desconectar de MongoDB:', error);
    }
};