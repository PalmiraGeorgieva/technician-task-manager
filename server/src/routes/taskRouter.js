import { Router } from 'express';
import { getAllTasks, createTask, updateTask, deleteTask } from '../controllers/taskController.js';
import { authenticate } from '../middleware/authMiddleware.js';
import { getTasksComments, createComment, deleteComment } from '../controllers/commentController.js';


const taskRouter = Router();

taskRouter.get("/", getAllTasks);
taskRouter.post("/", authenticate, createTask);
taskRouter.put("/:taskId", authenticate, updateTask);
taskRouter.delete("/:taskId", authenticate, deleteTask);

taskRouter.get("/:taskId/comments", getTasksComments);
taskRouter.post("/:taskId/comments", authenticate, createComment);
taskRouter.delete("/comments/:commentId", authenticate, deleteComment);

export default taskRouter;