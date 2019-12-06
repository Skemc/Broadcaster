import {reports, reportModel} from '../models/reportModel';
import { users } from '../models/usersModel';
import reportValidation from '../helpers/reportValidation';
import queries from '../config/queries';
import executeQuery from '../config/connectDB';

class ReportController {
    static async createRedFlag(req, res) {

        const { error } = reportValidation.validateReport(req.body);
        try {
            if (error) {
                return res.status(400).send({ status: 400, error: error.message });
            }
            

            const isUserExist = await reportModel.isUserExist(req);
            const isReportExist = await reportModel.isReportExist(req);
            
            if (isUserExist !== true) {
                return res.status(401).send({ status: 401, message: 'user not exist!' });
            }
            
            if (isReportExist===true) {
                return res.status(409).send({ status: 409, message: 'Already reported!' });
            }
            const createIncident = await reportModel.createArticle(req);

            return res.status(201).send({
                status: 201,
                message: "Report created successfully",
                data: createIncident[0]
            });
        }
        catch (error) {
            return res.status(400).send({ status: 400, error: error.message });
        }
    }

    static async getAllRedFlagRecords(req, res) {
        try {
            const isUserExist = await reportModel.isUserExist(req);
            if (isUserExist !==  true) {
                return res.status(401).send({ status: 401, message: 'User not exist' });
            }
            const getAll = await reportModel.getAll(req);
            return res.status(200).send({ status: 200, message: 'Data fetched', data: getAll });
        }
        catch (error) {
            return res.status(400).send({ status: 400, error: error.message });
        }
    }

    static async getOneRedFlagRecords(req, res) {
        try {
            const isUserExist = await reportModel.isUserExist(req);
            const getSpecific = await reportModel.getSpecific(req);
            if (isUserExist !== true) {
                return res.status(401).send({ status: 401, message: 'User not exist' });
            }
            if (!getSpecific[0]) {
                return res.status(404).send({ status: 404, message: 'Record not found' });

            }
            return res.status(200).send({ status: 200, message: 'Data fetched', data: getSpecific });
        }
        catch (error) {
            return res.status(400).send({ status: 400, error: error.message });
        }
    }

    static async deleteRedFlagRecords(req, res) {
        try {
            const isUserExist = await reportModel.isUserExist(req);
            const getSpecific = await reportModel.getSpecific(req);

            if (isUserExist !== true) {
                return res.status(403).send({ status: 403, message: 'you are not the owner' });
            }
            if (!getSpecific[0]) {
                return res.status(404).send({ status: 404, message: 'Record not found' });
            }
            await reportModel.deleteIncident(req);
            return res.status(200).send({
                status: 200,
                message: "Deleted successfully"
            });
        }
        catch (error) {
            return res.status(400).send({ status: 400, error: error.message });
        }
    }

    static async editRedFlagLocationRecords(req, res) {
        try {
            const getSpecific = await reportModel.getSpecific(req);
            const isEdited = await reportModel.isEdited(req);
            if (!getSpecific[0]) {
                return res.status(404).send({ status: 404, message: 'record not found' });
            }
            if (isEdited) {
                return res.status(409).send({ status: 409, message: 'record already edited' });
            }
            if (getSpecific[0].createdby !== req.user.email) {
                return res.status(403).send({ status: 403, message: 'You are not the owner' });
            }
            const editIncident = await reportModel.editIncident(req);
            return res.status(200).send({
                status: 200,
                message: "Edited successfully",
                data: {
                    locationLat: editIncident[0].locationlat,
                    locationLong: editIncident[0].locationlong,
                }
            });
        }
        catch (error) {
            return res.status(400).send({ status: 400, error: error.message });
        }

    }

    static async editRedFlagCommentRecords(req, res) {
        try {
            const getSpecific = await reportModel.getSpecific(req);
            const isEditedComment = await reportModel.isEditedComment(req);
            if (!getSpecific[0]) {
                return res.status(404).send({ status: 404, message: 'record not found' });
            }
            if (isEditedComment) {
                return res.status(409).send({ status: 409, message: 'record already edited' });
            }
            if (getSpecific[0].createdby !== req.user.email) {
                return res.status(403).send({ status: 403, message: 'You are not the owner' });
            }
            const editIncident = await reportModel.editCommentIncident(req);
                return res.status(200).send({
                    status: 200,
                    message: "Edited successfully",
                    data: {
                        id: editIncident[0].id,
                        comment: editIncident[0].comment
                    }
                });
            
        }
        catch (error) {
            return res.status(400).send({ status: 400, error: error.message });
        }
    }
}
export default ReportController;