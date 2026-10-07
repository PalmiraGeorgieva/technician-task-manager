import { Router } from 'express';
import { getAllTasks, createTask, updateTask } from '../controllers/taskController.js';
import { authenticate } from '../middleware/authMiddleware.js';


const taskRouter = Router();

taskRouter.get("/", getAllTasks);
taskRouter.post("/", authenticate, createTask);
taskRouter.put("/:taskId", authenticate, updateTask);

export default taskRouter;