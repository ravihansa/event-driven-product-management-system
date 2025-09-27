import prisma from '../../configs/database.js';

export async function allCategoryList() {
    return prisma.category.findMany({
        select: { name: true, id: true },
        orderBy: { id: 'asc' },
    });
}
