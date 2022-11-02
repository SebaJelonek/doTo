import mongoose from 'mongoose';

interface ITask {
  task: string;
  dueDate: Date;
  reciver: string;
}

interface TaskModel extends mongoose.Model<ITask> {}

const TaskSchema = new mongoose.Schema<ITask, TaskModel>({
  task: { type: String, required: true },
  dueDate: { type: Date },
  reciver: { type: String },
});

const Task = mongoose.model('task', TaskSchema);

export default Task;
