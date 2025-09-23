import express from 'express';
import {
    listProducts,
    createProduct,
    updateProduct,
    deleteProduct,
} from './productController.js';

const productRouter = express.Router();

productRouter.get('/:sellerId', listProducts);
productRouter.post('/', createProduct);
productRouter.put('/:id', updateProduct);
productRouter.delete('/:id', deleteProduct);

export default productRouter;
