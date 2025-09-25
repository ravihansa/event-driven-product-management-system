import { PrismaClient } from '@prisma/client';

let prisma;
if (!globalThis.prisma) {
    globalThis.prisma = new PrismaClient({ log: ['warn', 'error'] });
}
prisma = globalThis.prisma;

const shutdown = async (signal) => {
    console.info('Shutting down', signal);
    try {
        await prisma.$disconnect();
        console.info('Database connection closed');
    } catch (e) {
        console.error(e.message);
    }
};

['SIGINT', 'SIGTERM', 'SIGQUIT'].forEach(sig => process.on(sig, () => shutdown(sig)));

export default prisma;
