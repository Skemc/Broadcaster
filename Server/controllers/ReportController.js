import reports from '../models/reportModel';
import users from '../models/usersModel';
import reportValidation from '../helpers/reportValidation';

class ReportController {
    static createRedFlag(req, res) {
        const { error } = reportValidation.validateReport(req.body);
        if (error) {
            const valError = error.details.map( (e) => e.message);
            return res.status(400).send({ status: 400, error: valError.join(",").replace(/"/g, '')});
        }
        const owner = req.user.email;
        const { title, type, comment, locationLat, locationLong } = req.body;
        const isReportExist = reports.find(c => c.title == title && c.comment == comment && c.type == type);
        const isUserExist = users.find(s => s.email == owner);
        if (!isUserExist) {
            return res.status(401).send({ status: 401, message: 'User does not exist!' });
        }
        if (isReportExist) {
            return res.status(409).send({ status: 409, message: 'Already reported!' });
        }
        const newReport = {
            id: reports.length + 1,
            title,
            type,
            comment,
            locationLat,
            locationLong,
            status: 'Draft',
            createdOn: new Date(),
            createdBy: owner
        };
        reports.push(newReport);
        const { ...data } = newReport;
        return res.status(200).send({status: 200, message: 'Reported successfully', data});
    }

    static getAllRedFlagRecords(req,res){

        var { email } = req.user;
        const isUserExist = users.find(u=>u.email===email);
    
        if(!isUserExist){
            return res.status(401).send({status: 401, message: 'User not exist'});
        }
        return res.status(200).send({status: 200, message: 'Data fetched', data: reports});
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
        const findRecord = reports.find(c=>c.id==id);
        const isOwner = reports.find(s=>s.createdBy==email);

        if(!isOwner){
            return res.status(403).send({status: 403, message: 'you are not the owner'});
        }
        if(!findRecord){
            return res.status(404).send({status: 404, message: 'Record not found'});
        }
        reports.splice(reports.indexOf(findRecord, 1));
        return res.status(200).send({status: 200, message: 'Deleted successfully'});
    }

}
export default ReportController;