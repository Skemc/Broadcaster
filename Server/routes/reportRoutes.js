import express from 'express';
import verifyUser from '../middleware/verifyUser';
import ReportController from '../controllers/ReportController';

const router = express.Router();

router.post('/red-flags', verifyUser, ReportController.createRedFlag);
router.get('/red-flags', verifyUser, ReportController.getAllRedFlagRecords);

export default router;