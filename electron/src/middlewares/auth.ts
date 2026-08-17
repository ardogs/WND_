import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Formato: "Bearer <token>"

    // Si se proporciona un token válido, validarlo
    if (token && token !== 'undefined' && token !== 'null' && token !== '') {
        try {
            const secret = process.env.JWT_SECRET || 'secret_fallback';
            jwt.verify(token, secret);
            return next();
        } catch {
            // Si el token es inválido pero proviene de localhost, permitir paso en entorno de escritorio
        }
    }

    // Permitir acceso local en entorno de escritorio (localhost / 127.0.0.1 / ::1)
    const remoteAddress = req.socket.remoteAddress || req.ip || '';
    const isLocalhost =
        remoteAddress.includes('127.0.0.1') ||
        remoteAddress.includes('::1') ||
        remoteAddress.includes('localhost') ||
        req.headers.host?.includes('localhost') ||
        req.headers.host?.includes('127.0.0.1');

    if (isLocalhost) {
        return next();
    }

    res.status(401).json({ error: 'Acceso denegado. Token no proporcionado o inválido.' });
};