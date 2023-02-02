import mongoose from 'mongoose';

interface ISheet {
  sheet: string;
  itemsIds: string[];
  tasksIds: string[];
}

interface SheetModel extends mongoose.Model<ISheet> {} //any hooks go here

const SheetSchema = new mongoose.Schema<ISheet, SheetModel>({
  sheet: { type: String, required: true },
  itemsIds: { type: [String] },
  tasksIds: { type: [String] },
});
export const Sheet = mongoose.model('sheet', SheetSchema);
