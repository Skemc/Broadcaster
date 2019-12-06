import express from 'express';
import dotenv from "dotenv";
import bodyParser from 'body-parser';
import myRoutes from './routes/index';

const app = express();

dotenv.config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.use('/api/v1', myRoutes);

app.get('/'), (req,res) => {
    res.status(200).json({
      status:200,
      message: 'Welcome to Broadcaster'
});
};

app.use('*', (req, res)=>{
    return res.status(404).json({
        status: 404,
        error: 'the route is not found'
    });
});

const port = process.env.PORT || 3000;

app.listen(port, ()=>{
    console.log(`connected on ${port}`);
});

export default app;