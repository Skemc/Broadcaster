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

    static getOneRedFlagRecords(req,res){
    
        const { id } = req.params;
        const { email } = req.user;
        const isUserExist = users.find(u=>u.email===email);
        const findRecord = reports.find(c=>c.id==id);
    
        if(!isUserExist){
            return res.status(401).send({status: 401, message: 'User not exist'});
        }
        if(!findRecord){
            return res.status(404).send({status: 404, message: 'Record not found'});

        }
        return res.status(200).send({status: 200, message: 'Data fetched', data: findRecord});
    }

    static deleteRedFlagRecords(req,res){
    
        const { id } = req.params;
        const { email } = req.user;
        const findRecord = reports.find(c => c.id == id);
        const isOwner = reports.find(s => s.createdBy == email);

        if(!isOwner){
            return res.status(403).send({status: 403, message: 'you are not the owner'});
        }
        if(!findRecord){
            return res.status(404).send({status: 404, message: 'Record not found'});
        }
        reports.splice(reports.indexOf(findRecord, 1));
        return res.status(200).send({status: 200, message: 'Deleted successfully'});
    }

    static editRedFlagLocationRecords(req,res){
        const { locationLat, locationLong } = req.body;
        const { id } = req.params;
        const { email } = req.user;
        const findRecord = reports.find(c => c.id == id);
        const isEdited = reports.find(e => e.locationLat == locationLat && e.locationLong == locationLong&&e.createdBy==email);

        if (!findRecord) {
            return res.status(404).send({status: 404, message: 'record not found'});
        }
        if (isEdited) {
            return res.status(409).send({status: 409, message: 'record already edited'});
        }
        
        if(findRecord.createdBy!==email){
            return res.status(403).send({status: 403, message: 'You are not the owner'});
        }
        const holder = new Array(findRecord);
        const data = holder.map(e => {
            e.locationLat = locationLat; 
            e.locationLong = locationLong;
            return e;
        });
            return res.status(200).send({status: 200, message: 'Eddited successfully', data});
    }

    static editRedFlagCommentRecords(req,res){
        const { comment } = req.body;
        const { id } = req.params;
        const { email } = req.user;
        const findRecord = reports.find(c => c.id == id);
        const isEdited = reports.find(e => e.comment == comment);

 
        if (!findRecord) {
            return res.status(404).send({status: 404, message: 'record not found'});
        }
        if (isEdited) {
            return res.status(409).send({status: 409, message: 'record already edited'});
        }
        if(findRecord.createdBy !== email){
            return res.status(403).send({status: 403, message: 'You are not the owner'});
        }
        const holder = new Array(findRecord);
        const data = holder.map(e => {
            e.comment = comment;
            return e;
        });
            return res.status(200).send({status: 200, message: 'Eddited successfully', data});
    }

}
export default ReportController;