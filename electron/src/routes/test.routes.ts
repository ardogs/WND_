import { Router } from 'express';
import { testConnection } from '../controllers/test.ctrl';
import { verifyToken } from '../middlewares/auth';

const router = Router();

// Aplicamos el middleware verifyToken para proteger esta ruta
router.get('/ping', verifyToken, testConnection);

export default router;