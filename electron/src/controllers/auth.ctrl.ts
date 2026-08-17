import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const login = (req: Request, res: Response): void => {
    const { password } = req.body;
    const masterPassword = process.env.MASTER_PASSWORD;

    if (!password || password !== masterPassword) {
        res.status(401).json({ error: 'Credenciales inválidas' });
        return;
    }

    // Generar el token
    const secret = process.env.JWT_SECRET || 'secret_fallback';
    const token = jwt.sign(
        { role: 'api_client' }, // Payload genérico
        secret,
        // { expiresIn: '24h' } // El token expira en 24 horas (ajustable)
    );

    res.json({ token });
};