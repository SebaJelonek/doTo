import { Router } from 'express';

import { deleteTask, newTask, tasks } from '../Controller/TaskController';

export const TaskRouter = Router();

TaskRouter.get('/api/task/:_id', tasks);
TaskRouter.post('/api/task/new', newTask);
TaskRouter.post('/api/task/delete', deleteTask);
