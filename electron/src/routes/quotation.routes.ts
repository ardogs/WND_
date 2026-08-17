import { Router } from 'express';
import {
    processQuotation,
    getAllQuotations,
    getQuotationById,
    downloadQuotationExcel,
    deleteQuotation
} from '../controllers/quotation.ctrl';
import { verifyToken } from '../middlewares/auth';

const router = Router();

// Endpoint para procesar la cotización, generar Excel y guardar en MongoDB
router.post('/processQuotation', verifyToken, processQuotation);
router.post('/saveQuotation', verifyToken, processQuotation);
router.post('/', verifyToken, processQuotation);

// Endpoints CRUD para gestión del módulo de cotizaciones
router.get('/', verifyToken, getAllQuotations);
router.get('/:id', verifyToken, getQuotationById);
router.get('/:id/download', verifyToken, downloadQuotationExcel);
router.delete('/:id', verifyToken, deleteQuotation);

export default router;