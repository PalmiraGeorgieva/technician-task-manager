import Router from 'express';
import { getAllTasks, createTask } from '../controllers/taskController.js';


const taskRouter = Router();

taskRouter.get("/", getAllTasks);
taskRouter.post("/", createTask);


export default taskRouter;