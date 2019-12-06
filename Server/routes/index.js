import express from 'express';
import userRoute from './userRoutes';
import reportRoutes from './reportRoutes';

const path = express.Router();

path.use('/auth', userRoute);
path.use('/', reportRoutes);

export default path;