import asyncHandler from './../../utils/asyncHandler.js';
import { allCategoryList } from './categoryService.js';


export const categoryList = asyncHandler(async (req, res, next) => {
    const catList = await allCategoryList();
    res.locals.data = catList;
    res.locals.statusCode = 200;
    return next();
});
