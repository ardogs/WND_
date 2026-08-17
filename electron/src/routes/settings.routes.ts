import { Router } from 'express';
import { getSettings, updateSetting } from '../controllers/settings.ctrl';
import { verifyToken } from '../middlewares/auth';

const router = Router();

router.get('/', verifyToken,  getSettings);
router.patch('/darkmode', verifyToken, updateSetting);
router.patch('/apiUrl', verifyToken, updateSetting)
router.patch('/fontsize', verifyToken, updateSetting);
router.patch('/language', verifyToken, updateSetting);

export default router;