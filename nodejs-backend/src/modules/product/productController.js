import asyncHandler from './../../utils/asyncHandler.js';
import { listProdBySeller, createProd, updateProd, deleteProd } from './productService.js';
import { productListSchema, createProductSchema, updateProductSchema } from './productValidator.js';


export const listProducts = asyncHandler(async (req, res, next) => {
    productListSchema.parse(req.params);
    const sellerId = Number(req.params.sellerId);
    const products = await listProdBySeller(sellerId);
    res.locals.data = products;
    res.locals.statusCode = 200;
    return next();
});

export const createProduct = asyncHandler(async (req, res, next) => {
    createProductSchema.parse(req.body);
    const created = await createProd(req.body);
    res.locals.data = created;
    res.locals.statusCode = 201;
    return next();
});

export const updateProduct = asyncHandler(async (req, res, next) => {
    updateProductSchema.parse(req.body);
    const id = req.params.id;
    const updated = await updateProd(id, req.body);
    res.locals.data = updated;
    res.locals.statusCode = 200;
    return next();
});

export const deleteProduct = asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    await deleteProd(id);
    res.locals.statusCode = 200;
    return next();
});
