import type { RequestHandler } from 'express';
import { Sheet } from '../Model/Sheet';
import { Item } from '../Model/Item';

const itemNew: RequestHandler = async (req, res) => {
  const { item, sheetId } = req.body;
  const newItem = await Item.create({ item });
  const { _id } = newItem;

  try {
    await Sheet.findOneAndUpdate(
      { _id: sheetId },
      {
        $push: { itemsIds: _id },
      }
    );
    res.json({ _id, status: 200 });
  } catch (error) {
    console.log(error);
    res.json({ error, status: 400 });
  }
};

const itemDelete: RequestHandler = async (req, res) => {
  const { _id, itemId } = req.body;

  try {
    await Item.findByIdAndDelete(itemId);
    await Sheet.findOneAndUpdate({ _id }, { $pull: { itemsIds: itemId } });
    res.json({ message: 'Item has been deleted', status: 200 });
  } catch (error) {
    console.log(error);
    res.json({ error, status: 400, message: 'something went wrong' });
  }
};

export { itemNew, itemDelete };
