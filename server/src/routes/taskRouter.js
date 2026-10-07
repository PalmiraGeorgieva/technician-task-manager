import { Router } from 'express';
import { getAllTasks, createTask, updateTask, deleteTask } from '../controllers/taskController.js';
import { authenticate } from '../middleware/authMiddleware.js';


const taskRouter = Router();

taskRouter.get("/", getAllTasks);
taskRouter.post("/", authenticate, createTask);
taskRouter.put("/:taskId", authenticate, updateTask);
taskRouter.delete("/:taskId", authenticate, deleteTask);

export default taskRouter;