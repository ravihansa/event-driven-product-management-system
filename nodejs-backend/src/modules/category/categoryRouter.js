import express from 'express';
import { categoryList } from './categoryController.js';

const categoryRouter = express.Router();

categoryRouter.get('/', categoryList);

export default categoryRouter;
