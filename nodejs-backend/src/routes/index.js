import express from 'express';
const router = express.Router();
import productRouter from './../modules/product/productsRouter.js';
import categoryRouter from '../modules/category/categoryRouter.js';

router.get('/', () => { }).use('/product', productRouter);
router.get('/', () => { }).use('/category', categoryRouter);

export default router;
