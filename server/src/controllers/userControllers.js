import prisma from '../lib/prisma.js';

export const getTechnicians = async (req, res) => {
    try {
        const technicians = await prisma.user.findMany({
            where: {
                role: "TECHNICIAN",
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
            }
        });

        res.json(technicians);

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Failed to load technicians",
        });
        
    }
}