import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const connectString = process.env.DATABASE_URL;
const pool = new Pool({
    connectionString: connectString,
});

const createTable = async () => {
    const usersTables = `CREATE TABLE IF NOT EXISTS users(
        id SERIAL NOT NULL PRIMARY KEY,
        firstname TEXT NOT NULL,
        lastname TEXT NOT NULL,
        username TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        phonenumber TEXT NOT NULL,
        isadmin TEXT DEFAULT false NOT NULL
  
    )`;
    const incidentsTable = `CREATE TABLE IF NOT EXISTS incidents (
        id SERIAL NOT NULL PRIMARY KEY,
        title TEXT NOT NULL,
        type TEXT NOT NULL,
        comment TEXT NOT NULL,
        locationLat TEXT NOT NULL,
        locationLong TEXT NOT NULL,
        createdOn TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        createdBy TEXT NOT NULL
    )`;

     await pool.query(usersTables);
     await pool.query(incidentsTable);

    //  const firstUser = `INSERT INTO users(firstname, lastname, username, email, password, phonenumber) VALUES('eric','karekezi', 'skemc', 'eric@gmail.com', ' $2b$10$hjXgNwYIzx8Hxeg.silh3usMzPF.TGMV3lMY55LACDhv19TnrtrMW','09876543456')`;
     const firstIncident = `INSERT INTO incidents(title, type, comment, locationLat, locationLong, createdBy) VALUES('crime', 'intervention','killed an officer','2000','400', 'eric@gmail.com')`;
     
    //  await pool.query(firstUser);
     await pool.query(firstIncident);
};
createTable();
