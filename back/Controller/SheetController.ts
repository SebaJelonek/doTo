import type { RequestHandler } from 'express';
import Sheet from '../Model/Sheet';
import Task from '../Model/Task';

const sheetFind: RequestHandler = async (req, res) => {
  const { _id } = req.params;
  const tasks = [];
  try {
    const sheet = await Sheet.findById(_id);
    if (sheet) {
      for (let index = 0; index < sheet.tasksIds.length; index++) {
        const taskId = sheet.tasksIds[index];
        const task = await Task.findById(taskId);
        tasks.push({ id: task?._id, task: task?.task });
      }
    }
    console.log(tasks);

    res.json({ status: 200, tasks });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ error, message: 'something went wrong', status: 400 });
  }
};

const sheetNew: RequestHandler = async (req, res) => {
  console.log(req.params);
  const { sheet } = req.params;
  const newSheet = await Sheet.create({ sheet });
  res.json({ msg: 'sheet has been created', status: 200, sheet: newSheet });
};

const sheetDelete: RequestHandler = async (req, res) => {
  const { _id } = req.params;
  await Sheet.findByIdAndDelete(_id);
};

export { sheetNew, sheetFind, sheetDelete };
