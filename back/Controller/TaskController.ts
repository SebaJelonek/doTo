import type { RequestHandler } from 'express';
import { Sheet } from '../Model/Sheet';
import { Task } from '../Model/Task';

export const newTask: RequestHandler = async (req, res) => {
  const { task, createDate, sheetId } = req.body;
  const newTask = await Task.create({ task, createDate });
  const { _id } = newTask;

  try {
    await Sheet.findOneAndUpdate(
      { _id: sheetId },
      {
        $push: { tasksIds: _id },
      }
    );
    res.json({ status: 200, _id, newTask });
  } catch (error) {
    console.log(error);
    res.json({ error, status: 400 });
  }
};

export const deleteTask: RequestHandler = async (req, res) => {
  const { _id, createDate, sheetId } = req.body;

  if (parseInt(_id) === createDate) {
    // if _id is type of string
    try {
      const task = await Task.findOneAndDelete({ createDate: _id });
      await Sheet.findOneAndUpdate(
        { _id: sheetId },
        { $pull: { tasksIds: task?._id } }
      );
      res.json({ status: 200, massege: 'deleted and it works' });
    } catch (error) {
      console.log(error);
    }
  } else {
    try {
      await Task.findByIdAndDelete(_id);
      await Sheet.findOneAndUpdate(
        { _id: sheetId },
        { $pull: { tasksIds: _id } }
      );
      res.json({ status: 200, massege: 'deleted' });
    } catch (error) {
      console.log(error);
    }
  }
};

export const tasks: RequestHandler = async (req, res) => {
  const { _id } = req.params;

  const tasks = [];
  try {
    const sheet = await Sheet.findById(_id);
    if (sheet) {
      for (let index = 0; index < sheet.tasksIds.length; index++) {
        const taskId = sheet.tasksIds[index];
        const task = await Task.findById(taskId);
        task !== null &&
          tasks.push({
            id: task._id,
            task: task.task,
            isChecked: task.isChecked,
            createDate: task.createDate,
          });
      }
    }
    res.json({ status: 200, tasks });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ error, message: 'something went wrong', status: 400 });
  }
};
