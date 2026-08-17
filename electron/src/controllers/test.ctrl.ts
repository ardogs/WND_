import { Request, Response } from 'express';

export const testConnection = (req: Request, res: Response): void => {
    // Retornamos status 200 HTTP, con el mensaje que solicitaste
    res.status(200).json({ 
        status: 'Connected', 
        message: 'Comunicación con la API exitosa.' 
    });
};