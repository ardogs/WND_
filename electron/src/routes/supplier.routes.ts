import { Router } from 'express';
import { getAllSuppliers, getSupplierByReg, saveSupplier } from '../controllers/supplier.ctrl';
import { verifyToken } from '../middlewares/auth';

const router = Router();

router.get('/', verifyToken, getAllSuppliers);
router.get('/:reg', verifyToken, getSupplierByReg);
router.post('/', verifyToken, saveSupplier);
router.post('/saveSupplier', verifyToken, saveSupplier);
router.patch('/saveSupplier', verifyToken, saveSupplier);
router.patch('/:reg', verifyToken, saveSupplier);
router.put('/saveSupplier', verifyToken, saveSupplier);
router.put('/:reg', verifyToken, saveSupplier);

export default router;