import prisma from '../../src/configs/database.js';
import AppError from '../../src/utils/appError.js';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as productService from '../../src/modules/product/productService.js';
import {
    publishProductCreated,
    publishProductUpdated,
    publishProductDeleted
} from '../../src/events/publishers/productEventPublisher.js';

// Mock prisma client
vi.mock('../../src/configs/database.js', () => ({
    default: {
        product: {
            findMany: vi.fn(),
            findUnique: vi.fn(),
            create: vi.fn(),
            update: vi.fn(),
        },
        category: {
            findUnique: vi.fn(),
        },
        seller: {
            findUnique: vi.fn(),
        },
    },
}));

// Mock event publishers
vi.mock('../../src/events/publishers/productEventPublisher.js', () => ({
    publishProductCreated: vi.fn(),
    publishProductUpdated: vi.fn(),
    publishProductDeleted: vi.fn(),
}));

describe('productService', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('listProdBySeller', () => {
        it('should return products for a seller', async () => {
            // Mocked prisma findMany to return fake products
            const mockProducts = [{ id: 'p1', name: 'Mouse1' }];
            prisma.product.findMany.mockResolvedValue(mockProducts);

            const result = await productService.listProdBySeller(1);

            // Check that Prisma is called with the correct filters (sellerId)
            expect(prisma.product.findMany).toHaveBeenCalledWith({
                where: { sellerId: 1, isActive: true },
                include: { category: { select: { name: true, id: true } } },
                orderBy: { updatedAt: 'desc' },
            });
            // Check that the returned result matches
            expect(result).toEqual(mockProducts);
        });
    });

    describe('createProd', () => {
        it('should create a product successfully', async () => {
            const mockCategory = { id: 1, name: 'Electronics' };
            const mockSeller = { id: 1, name: 'Amara' };
            const mockProduct = { id: 'p1', name: 'Keyboard' };
            prisma.category.findUnique.mockResolvedValue(mockCategory);
            prisma.seller.findUnique.mockResolvedValue(mockSeller);
            prisma.product.create.mockResolvedValue(mockProduct);

            const payload = { name: 'Keyboard', price: 100, categoryId: 1, sellerId: 1 };
            const result = await productService.createProd(payload);

            expect(prisma.category.findUnique).toHaveBeenCalledWith({ where: { id: 1 } });
            expect(prisma.seller.findUnique).toHaveBeenCalledWith({ where: { id: 1 } });
            expect(prisma.product.create).toHaveBeenCalled();
            expect(prisma.product.create).toHaveBeenCalledWith({
                data: {
                    name: 'Keyboard', price: 100, category: { connect: mockCategory }, seller: { connect: mockSeller }
                }
            });
            expect(publishProductCreated).toHaveBeenCalledWith(mockProduct);
            expect(result).toEqual(mockProduct);
        });

        it('should throw error for invalid category or seller', async () => {
            prisma.category.findUnique.mockResolvedValue(null);
            prisma.seller.findUnique.mockResolvedValue(null);

            await expect(productService.createProd({ categoryId: 99, sellerId: 100 }))
                .rejects.toBeInstanceOf(AppError);
        });
    });

    describe('updateProd', () => {
        it('should update product successfully', async () => {
            const mockCategory = { id: 2, name: 'Electronics' };
            const mockUpdated = { id: 'p1', name: 'Updated Product' };
            prisma.product.findUnique.mockResolvedValue({ id: 'p1', sellerId: 1 });
            prisma.category.findUnique.mockResolvedValue(mockCategory);
            prisma.product.update.mockResolvedValue(mockUpdated);

            const result = await productService.updateProd('p1', {
                name: 'Updated Product',
                sellerId: 1,
                categoryId: 2,
            });

            expect(prisma.product.findUnique).toHaveBeenCalledWith({ where: { id: 'p1' } });
            expect(prisma.category.findUnique).toHaveBeenCalledWith({ where: { id: 2 } });
            expect(prisma.product.update).toHaveBeenCalled();
            expect(prisma.product.update).toHaveBeenCalledWith({
                where: { id: 'p1' },
                data: { name: 'Updated Product', category: { connect: mockCategory } }
            });
            expect(publishProductUpdated).toHaveBeenCalledWith(mockUpdated);
            expect(result).toEqual(mockUpdated);
        });

        it('should throw error if product does not exist', async () => {
            prisma.product.findUnique.mockResolvedValue(null);

            await expect(productService.updateProd('badId', { sellerId: 1 }))
                .rejects.toBeInstanceOf(AppError);
        });

        it('should throw error if seller id mismatch', async () => {
            prisma.product.findUnique.mockResolvedValue({ id: 'p1', sellerId: 1 });

            await expect(productService.updateProd('p1', { sellerId: 2 }))
                .rejects.toBeInstanceOf(AppError);
        });

        it('should throw error for invalid category id', async () => {
            prisma.product.findUnique.mockResolvedValue({ id: 'p1', sellerId: 1 });
            prisma.category.findUnique.mockResolvedValue(null);

            await expect(productService.updateProd('p1', { sellerId: 1, categoryId: 99 }))
                .rejects.toBeInstanceOf(AppError);
        });
    });

    describe('deleteProd', () => {
        it('should deactivate product successfully', async () => {
            prisma.product.findUnique.mockResolvedValue({ id: 'p1' });
            const fakeDeleted = { id: 'p1', isActive: false };
            prisma.product.update.mockResolvedValue(fakeDeleted);

            const result = await productService.deleteProd('p1');

            expect(prisma.product.update).toHaveBeenCalledWith({
                where: { id: 'p1' },
                data: { isActive: false },
            });
            expect(publishProductDeleted).toHaveBeenCalledWith(fakeDeleted);
            expect(result).toEqual(fakeDeleted);
        });

        it('should throw error if product not found', async () => {
            prisma.product.findUnique.mockResolvedValue(null);

            await expect(productService.deleteProd('badId'))
                .rejects.toBeInstanceOf(AppError);
        });
    });
});
