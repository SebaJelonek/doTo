import { Router } from 'express';
import { itemNew, itemDelete } from '../Controller/ItemsController';
const TaskRouter = Router();

TaskRouter.post('/api/task/delete', itemDelete); //task
TaskRouter.post('/api/task/new/', itemNew); //task

export default TaskRouter;
