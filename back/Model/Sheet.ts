import mongoose from 'mongoose';

interface ISheet {
  sheet: string;
  tasksIds: string[];
}

interface SheetModel extends mongoose.Model<ISheet> {} //any hooks go here

const SheetSchema = new mongoose.Schema<ISheet, SheetModel>({
  sheet: { type: String, required: true },
  tasksIds: { type: [String] },
});

const Sheet = mongoose.model('sheet', SheetSchema);

export default Sheet;
