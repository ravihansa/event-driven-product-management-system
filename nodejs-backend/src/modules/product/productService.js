import prisma from '../../configs/database.js';
import AppError from '../../utils/appError.js';
import {
    publishProductCreated,
    publishProductUpdated,
    publishProductDeleted
} from '../../events/publishers/productEventPublisher.js';

export async function listProdBySeller(sellerId) {
    return prisma.product.findMany({
        where: { sellerId, isActive: true },
        include: {
            category: {
                select: { name: true }
            },
        },
        orderBy: { updatedAt: 'desc' },
    });
}

export async function createProd(payload) {

    const { categoryId, sellerId, ...productData } = payload;
    const [category, seller] = await Promise.all([prisma.category.findUnique({ where: { id: categoryId } }), prisma.seller.findUnique({ where: { id: sellerId } })]);
    if (!category || !seller) {
        throw new AppError('Invalid category or seller', 'BAD_USER_INPUT', 400);
    }
    const newProductData = {
        ...productData, category: { connect: category }, seller: { connect: seller }
    }
    const product = await prisma.product.create({
        data: newProductData
    });

    await publishProductCreated(product);
    return product;
}

export async function updateProd(id, payload) {

    const existing = await prisma.product.findUnique({ where: { id } });
    if (!existing) {
        throw new AppError('Invalid product id', 'BAD_USER_INPUT', 400);
    }
    const { categoryId, sellerId, ...productData } = payload;
    if (existing.sellerId !== sellerId) {
        throw new AppError('Invalid seller id', 'BAD_USER_INPUT', 400);
    }

    let newProductData = {
        ...productData
    }
    if (categoryId) {
        const category = await prisma.category.findUnique({ where: { id: categoryId } });
        if (!category) {
            throw new AppError('Invalid category id', 'BAD_USER_INPUT', 400);
        }
        newProductData = {
            ...productData, category: { connect: category }
        }
    }

    const updated = await prisma.product.update({
        where: { id },
        data: newProductData
    });

    await publishProductUpdated(updated);
    return updated;
}

export async function deleteProd(id) {
    const existing = await prisma.product.findUnique({ where: { id } });
    if (!existing) {
        throw new AppError('Invalid product id', 'BAD_USER_INPUT', 400);
    }

    const deactivated = await prisma.product.update({
        where: { id },
        data: { isActive: false }
    });

    await publishProductDeleted(deactivated);
    return deactivated;
}
