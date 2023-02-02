import mongoose from 'mongoose';

interface IItem {
  item: string;
  dueDate: Date;
  reciver: string;
}

interface ItemModel extends mongoose.Model<IItem> {}

const ItemSchema = new mongoose.Schema<IItem, ItemModel>({
  item: { type: String, required: true },
  dueDate: { type: Date },
  reciver: { type: String },
});

export const Item = mongoose.model('item', ItemSchema);
