import{ Pool } from 'pg';
import dotenv from 'dotenv';
import queries from './queries';
import executeQuery from './connectDB';

dotenv.config();


const drop = async () => {

    
    try{
        const connectString = process.env.DATABASE_URL;
        const pool = new Pool({
            connectionString: connectString,
        });

        const dropUser = await executeQuery(queries[2].userTable);
        const dropIncident = await executeQuery(queries[2].incidentTable);

        const dropTable = (dropUser,dropIncident);

        const dropTables = async () => {
            for(const table of dropTable){
                await pool.query(table);
            }
        };
        dropTables();
    }
    catch (error){
        console.log(error.messsage);
    }
    
};

drop();
