import express from 'express';
import verifyUser from '../middleware/verifyUser';
import ReportController from '../controllers/ReportController';
import {reports, reportModel} from '../models/reportModel';

const router = express.Router();

router.post('/red-flags', verifyUser, ReportController.createRedFlag);
router.get('/red-flags', verifyUser, ReportController.getAllRedFlagRecords);
router.get('/red-flags/:id', verifyUser, ReportController.getOneRedFlagRecords);
router.delete('/red-flags/:id', verifyUser, ReportController.deleteRedFlagRecords);
router.patch('/red-flags/location/:id', verifyUser, ReportController.editRedFlagLocationRecords);
// router.patch('/red-flags/comment/:id', verifyUser, ReportController.editRedFlagCommentRecords);

export default router;