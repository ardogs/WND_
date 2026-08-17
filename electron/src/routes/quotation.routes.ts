import { Router } from 'express';
import { processQuotation } from '../controllers/quotation.ctrl';
import { verifyToken } from '../middlewares/auth';

const router = Router();

// Endpoint para guardar la cotización y retornar el PDF
router.post('/processQuotation', verifyToken, processQuotation);

export default router;