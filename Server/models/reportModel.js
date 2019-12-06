import queries from '../config/queries';
import executeQuery from '../config/connectDB';

const reports = [
    {
        id: 1,
        title: "Crime",
        type: "intervention",
        comment: "Killed a child",
        locationLat: "4943",
        locationLong: "4342",
        status: "pending",
        createdOn: new Date(),
        createdBy: 'eric@gmail.com'
    },
    {
        id: 2,
        title: "Crime",
        type: "intervention",
        comment: "Killed a child",
        locationLat: "4943",
        locationLong: "4342",
        status: "pending",
        createdOn: new Date(),
        createdBy: 'eric6@gmail.com'
    }
];

class reportModel {
    static async createArticle(req) {

        const owner = req.user.email;

        const newReport = [
            req.body.title,
            req.body.type,
            req.body.comment,
            req.body.locationLat,
            req.body.locationLong,
            new Date(),
            owner
        ];
        

        const createIncident = await executeQuery(queries[1].createIncident, newReport); 
        return createIncident;
    }

    static async isUserExist(req){

        let result = false;
        const exists = await executeQuery(queries[0].isUserExist, [req.user.email]);
        if(exists.length > 0){
            result = true;
        }
        return result;
    }

    static async isReportExist(req){
        let result = false;
        const exists = await executeQuery(queries[1].isIncidentExist, [req.body.title, req.body.type]);
        if(exists.length > 0){
            result = true;            
        }
        return result;
    }
    
    static async isEdited(req){
        let result = false;
        const edited = await executeQuery(queries[1].isEdited, [req.body.locationLat, req.body.locationLong]);
        if(edited[0]){
            result = true;            
        }
        return result;
    }
    static async isEditedComment(req){
        let result = false;
        const edited = await executeQuery(queries[1].isEditedComment, [req.body.comment]);
        if(edited[0]){
            result = true;            
        }
        return result;
    }

    static async getAll(req){
        const getAll = await executeQuery(queries[1].getAllIncident);
        return getAll;
    }
    
    static async getSpecific(req){
        const getSpecific = await executeQuery(queries[1].getIncident, [req.params.id]);
        return getSpecific.rows || getSpecific;
    }
    
    static async deleteIncident(req){
         await executeQuery(queries[1].deleteIncident, [req.params.id]);
    }
    
    static async editIncident(req){
        const editIncident = await executeQuery(queries[1].editIncidentLocation, [req.body.locationLat, req.body.locationLong, parseInt(req.params.id,10), req.user.email ]);
        return editIncident;
    }
    static async editCommentIncident(req){
        const editIncident = await executeQuery(queries[1].editIncidentComment, [req.body.comment, parseInt(req.params.id,10), req.user.email ]);
        return editIncident;
    }


}
export  {reports, reportModel};