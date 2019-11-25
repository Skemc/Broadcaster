import reports from '../models/reportModel';
import users from '../models/usersModel';
import reportValidation from '../helpers/reportValidation';

class ReportController {
    static createRedFlag(req, res) {

        const { error } = reportValidation.validateReport(req.body);
        if (error) {
            return res.status(400).send({ status: 400, error: error.message });
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
        }
        reports.push(newReport);
        const { ...data } = newReport;
        return res.status(200).send({
            status: 200, message: 'Reported successfully', data
        });
    }

    static getAllRedFlagRecords(req,res){

        const { email } = req.user;
        const isUserExist = users.find(u=>u.email===email);
    
        if(!isUserExist){
            return res.status(401).send({status: 401, message: 'User not exist'});
        }
        return res.status(200).send({status: 200, message: 'Data fetched', data: reports});
    }

}
export default ReportController;