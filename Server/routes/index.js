import express from 'express';
import userRoute from './userRoutes';

const path = express.Router();

path.use('/auth', userRoute);

export default path;