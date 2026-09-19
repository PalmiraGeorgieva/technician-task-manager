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
                technicianId
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