import mongoose, { Schema, Document } from 'mongoose';

export interface ISettings extends Document {
    darkMode: boolean;
    fontSize: number;
    language: 'EN' | 'ES' | 'KR';
    apiUrl: string;
    apiToken: string;
    apiPwd: string;
}

const SettingsSchema: Schema = new Schema({
    // Usamos default para asegurar que siempre haya un valor inicial
    darkMode: { type: Boolean, default: false },
    fontSize: { type: Number, default: 14 },
    language: { type: String, enum: ['EN', 'ES', 'KR'], default: 'ES' },
    apiUrl: { type: String, required: true },
    apiToken: { type: String, required: true },
    apiVersion: {type: String, readonly: true, default: "0.0.1-Teta"}
}, {
    timestamps: true,
    // Forzamos a que solo exista un documento en esta colección para configuraciones globales
    collection: 'settings' 
});

export default mongoose.model<ISettings>('Settings', SettingsSchema);