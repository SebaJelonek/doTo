import { Router } from 'express';
import { taskNew, taskDelete } from '../Controller/TaskController';
const TaskRouter = Router();

TaskRouter.post('/api/task/delete', taskDelete); //task
TaskRouter.post('/api/task/new/', taskNew); //task

export default TaskRouter;
