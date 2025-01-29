import mongoose, { mongo } from 'mongoose';

interface ITask {
  task: string;
  isChecked: boolean;
  createDate: Date;
}

interface TaskModel extends mongoose.Model<ITask> {}

const TaskSchema = new mongoose.Schema<ITask, TaskModel>({
  task: { type: String, required: true },
  isChecked: { type: Boolean, default: false },
  createDate: { type: Date, default: Date.now() },
});

export const Task = mongoose.model('task', TaskSchema);
