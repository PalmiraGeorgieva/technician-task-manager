import prisma from "../lib/prisma.js";

export const getTasksComments = async (req, res) => {
    try {
        const taskId = Number(req.params.taskId);
        if(!Number.isInteger(taskId) || taskId <= 0) {
            return res.status(400).json({
                message: "Invalid task ID"
            });
        }

        const comments = await prisma.comment.findMany({
            where: {
                taskId,
            },
            include: {
                author: {
                    select: {
                        id: true,
                        name: true,
                    },

                },
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        res.json(comments);
    }catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Failed to load comments",
        });
    }
};

export const createComment = async (req, res) => {
    try {
        const taskId = Number(req.params.taskId);
        const { content } = req.body;

        if(!Number.isInteger(taskId) || taskId <= 0) {
            return res.status(400).json({
                message: "Invalid task ID"
            });
        }

        if(typeof content !== "string" || !content.trim() === "") {
            return res.status(400).json({
                message: "Comment cannot be empty",
            });
        }

        const task = await prisma.task.findUnique({
            where: { id: taskId },
            select: { id: true },
        });

        if(!task) {
            return res.status(404).json({
                message: "Task not found",
            });
        }

        const comment = await prisma.comment.create({
            data: {
                content: content.trim(),
                taskId,
                authorId: req.user.id,
            },
            include: {
                author: {
                    select: {
                        id: true,
                        name: true,
                    },

                },
            },
        });

        res.status(201).json(comment);

    }catch (error){
        console.log(error);

        res.status(500).json({
            message: "Failed to create comment",
        });
    }
};

export const deleteComment = async (req, res) => {
    try {
        const commentId = Number(req.params.commentId);

        if(!Number.isInteger(commentId) || commentId <= 0) {
            return res.status(400).json({
                message: "Invalid comment ID"
            });
        }

        const comment = await prisma.comment.findUnique({
            where: { id: commentId },
        });

        if(!comment) {
            return res.status(404).json({
                message: "Comment not found",
            });
        }

        if(comment.authorId !== req.user.id) {
            return res.status(403).json({
                message: "You are not authorized to delete this comment",
            });
        }

        await prisma.comment.delete({
            where: { id: commentId },
        });

        res.json({
            message: "Comment deleted successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Failed to delete comment",
        });
    }
}
