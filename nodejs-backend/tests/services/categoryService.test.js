import prisma from '../../src/configs/database.js';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { allCategoryList } from '../../src/modules/category/categoryService.js';


// Mock prisma client
vi.mock('../../src/configs/database.js', () => ({
    default: {
        category: {
            findMany: vi.fn(),
        }
    },
}));

describe('categoryService', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('allCategoryList', () => {
        it('should return all category list', async () => {
            // Mocked prisma findMany to return fake categories
            const mockCategories = [{ id: 1, name: 'Electronics' }, { id: 2, name: 'Books' }];
            prisma.category.findMany.mockResolvedValue(mockCategories);

            const result = await allCategoryList();

            // Check the Prisma query is called
            expect(prisma.category.findMany).toHaveBeenCalled();
            // Check that the returned result matches
            expect(result).toEqual(mockCategories);
        });
    });

});
