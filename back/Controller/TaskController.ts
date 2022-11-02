import type { RequestHandler } from 'express';
import Sheet from '../Model/Sheet';
import Task from '../Model/Task';

const taskNew: RequestHandler = async (req, res) => {
  const { task, sheetId } = req.body;
  const newTask = await Task.create({ task });
  const { _id } = newTask;

  try {
    await Sheet.findOneAndUpdate(
      { _id: sheetId },
      {
        $push: { tasksIds: _id },
      }
    );
    res.json({ _id, status: 200 });
  } catch (error) {
    console.log(error);
    res.json({ error, status: 400 });
  }
};

const taskDelete: RequestHandler = async (req, res) => {
  const { _id, taskId } = req.body;

  try {
    await Task.findByIdAndDelete(taskId);
    await Sheet.findOneAndUpdate({ _id }, { $pull: { tasksIds: taskId } });
    res.json({ message: 'Task has been deleted', status: 200 });
  } catch (error) {
    console.log(error);
    res.json({ error, status: 400, message: 'something went wrong' });
  }
};

export { taskNew, taskDelete };
