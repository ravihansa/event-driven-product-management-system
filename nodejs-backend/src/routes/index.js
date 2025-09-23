import express from 'express';
const router = express.Router();
import productRouter from './../modules/product/productsRouter.js';

router.get('/', () => { }).use('/product', productRouter);

export default router;
