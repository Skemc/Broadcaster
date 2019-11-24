import express from 'express';
import verifyUser from '../middleware/verifyUser';
import ReportController from '../controllers/ReportController';

const router = express.Router();

router.post('/red-flags', verifyUser, ReportController.createRedFlag);


export default router;