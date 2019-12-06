let queries = [
    {
        createUser: `INSERT INTO users (firstName, lastName, username, email, password, phonenumber) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
        isUserExist: `SELECT * FROM users WHERE email=$1`
    },
    {
        createIncident: `INSERT INTO incidents (title, type, comment, locationLat, locationLong, createdOn, createdBy) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`,
        isIncidentExist: `SELECT * FROM incidents WHERE title=$1 and type=$2`,
        isEdited: `SELECT * FROM incidents WHERE locationLat=$1 and locationLong=$2`,
        isEditedComment: `SELECT * FROM incidents WHERE comment=$1`,
        editIncidentComment: `UPDATE incidents SET comment=$1 WHERE id=$2 and createdBy=$3 RETURNING *`,
        editIncidentLocation: `UPDATE incidents SET locationLat=$1, locationLong=$2 WHERE id=$3 and createdBy=$4 RETURNING *`,
        deleteIncident: `DELETE FROM incidents WHERE id=$1`,
        getIncident: `SELECT * FROM incidents WHERE id=$1`,
        getAllIncident: `SELECT * FROM incidents`,
        editIncidentStatus: `UPDATE incidents SET status=$1 WHERE `
    },
    {
        userTable: `DROP TABLE IF EXISTS incidents CASCADE`,
        incidentTable: `DROP TABLE IF EXISTS users`
    }

];

export default queries;
