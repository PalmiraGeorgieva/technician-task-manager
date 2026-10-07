import prisma from "../lib/prisma.js";

export const getAllTasks = async (req, res) => {
    try {
        const tasks = await prisma.task.findMany({
            include: {
                technician: true,
            }
        });

        res.json(tasks);

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Failed to load tasks",
        });
        
    }
};

export const createTask = async (req, res) => {
    try {
        const {
            title,
            description,
            status,
            priority,
            date,
            address,
            technicianId,
        } = req.body;

        if(!title) {
            return res.status(400).json({
                message: "Title is required"
            });
        }

        const task = await prisma.task.create({
            data: {
                title,
                description,
                status,
                priority,
                date: new Date(date),
                address,
                technicianId,
                ownerId: req.user.id,
            },
            include: {
                technician: true,
            }
        });

        res.status(201).json(task);

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Failed to create task"
        });
    }
};

export const updateTask = async (req, res) => {
    try {
        const taskId = Number(req.params.taskId);
        const existingTask = await prisma.task.findUnique({
            where: { id: taskId },
        });

        if (!existingTask) {
            return res.status(404).json({ message: "Task not found" });
        }

        if(existingTask.ownerId !== req.user.id) {
            return res.status(403).json({ message: "You are not authorized to update this task" });
        }

        const {
            title,
            description,
            status,
            priority,
            date,
            address,
            technicianId,
        } = req.body;

        const updatedTask = await prisma.task.update({
            where: { id: taskId },
            data: {
                ...(title !== undefined && { title}),
                ...(description !== undefined && { description }),
                ...(status !== undefined && { status }),
                ...(priority !== undefined && { priority }),
                ...(date !== undefined && { date: new Date(date) }),
                ...(address !== undefined && { address }),
                ...(technicianId !== undefined && { 
                    technicianId: 
                        technicianId === null ? null : Number(technicianId)
                    }),
            },
            include: {
                technician: true,
            }
        });

        res.json(updatedTask);
    }catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Failed to update task"
        });
    }
};
    