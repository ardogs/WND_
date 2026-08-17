import { Request, Response } from 'express';
import Settings from '../models/settings.model';


// Obtener las configuraciones
export const getSettings = async (req: Request, res: Response): Promise<void> => {
    try {
        // Buscamos el primer documento que encuentre (solo debería haber uno)
        const settings = await Settings.findOne();
        if (!settings) {
            res.status(404).json({ message: 'No se encontraron configuraciones.' });
            return;
        }
        res.json(settings);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener configuraciones' });
    }
};

export const updateSetting = async (req: Request, res: Response): Promise<void> => {
    try {
        // Obtenemos los datos del cuerpo de la petición (ej: { darkMode: true })
        const updateData = req.body;

        // Utilizamos el operador $set de MongoDB para actualizar solo los campos enviados
        const updatedSettings = await Settings.findOneAndUpdate(
            {}, 
            { $set: updateData }, 
            { 
                returnDocument: 'after',
                runValidators: true,
                upsert: true 
            }
        );

        res.json({
            message: 'Campo actualizado correctamente',
            data: updatedSettings
        });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el campo' });
    }
};
