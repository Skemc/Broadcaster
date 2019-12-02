let queries = [
    {
        createUser: `INSERT INTO users (firstName, lastName, username, email, password, phonenumber) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
        isUserExist: `SELECT * FROM users WHERE email=$1`
    },
    {
        createIncident: `INSERT INTO incidents (title, type, comment, location, status, authorid, createdon) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`,
        isIncidentExist: `SELECT * FROM incidents WHERE title=$1 and type=$2`,
        editIncidentComment: `UPDATE incident SET title=$1, comment=$2 WHERE id=$3 RETURNING *`,
        editIncidentLocation: `UPDATE incident SET title=$1, location=$2 WHERE id=$3 RETURNING *`,
        deleteIncident: `DELETE FROM incident WHERE id=$1`,
        getIncident: `SELECT * FROM incident WHERE id=$1`,
        findIncident: `SELECT * FROM incident WHERE id=$1`,
        getAllIncident: `SELECT * FROM incident`
    },
    {
        userTable: `DROP TABLE IF EXISTS incidents CASCADE`,
        incidentTable: `DROP TABLE IF EXISTS users`
    }

];

export default queries;
