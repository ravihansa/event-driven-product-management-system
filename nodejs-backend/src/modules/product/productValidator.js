import { z } from 'zod';

export const productListSchema = z.object({
    sellerId: z.coerce.number().int().positive()
});

export const createProductSchema = z.object({
    name: z.string().min(3, 'Product name must be at least 3 characters long'),
    description: z.string().optional(),
    price: z.number().min(0, 'Price must be 0 or positive').multipleOf(0.01),
    quantity: z.number().min(0, 'Quantity must be 0 or positive'),
    sellerId: z.number().min(1, 'SellerId must be positive'),
    categoryId: z.number().min(1, 'CategoryId must be positive')
});

export const updateProductSchema = z.object({
    name: z.string().min(3, 'Product name must be at least 3 characters long').optional(),
    description: z.string().optional(),
    price: z.number().min(0, 'Price must be 0 or positive').multipleOf(0.01).optional(),
    quantity: z.number().min(0, 'Quantity must be 0 or positive').optional(),
    categoryId: z.number().min(1, 'CategoryId must be positive').optional(),
    sellerId: z.number().min(1, 'SellerId must be positive'),
});
