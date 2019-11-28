import express from 'express';
import verifyUser from '../middleware/verifyUser';
import ReportController from '../controllers/ReportController';

const router = express.Router();

router.post('/red-flags', verifyUser, ReportController.createRedFlag);
router.get('/red-flags', verifyUser, ReportController.getAllRedFlagRecords);
router.get('/red-flags/:id', verifyUser, ReportController.getOneRedFlagRecords);
router.delete('/red-flags/:id', verifyUser, ReportController.deleteRedFlagRecords);

export default router;