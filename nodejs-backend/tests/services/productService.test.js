import prisma from '../../src/configs/database.js';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as productService from '../../src/modules/product/productService.js';

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

describe('productService', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('listProdBySeller', () => {
        it('should return products for a seller', async () => {
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

});
