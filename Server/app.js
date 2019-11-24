import express from 'express';
import dotenv from "dotenv";
import bodyParser from 'body-parser';
import myRoutes from './routes/index';

const app = express();

dotenv.config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.use('/api/v1', myRoutes);

const port = process.env.PORT || 4000;

app.listen(port, ()=>{
    console.log(`connected on ${port}`);
});

export default app;