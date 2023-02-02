import type { RequestHandler } from 'express';
import { Sheet } from '../Model/Sheet';
import { Item } from '../Model/Item';

const sheetFind: RequestHandler = async (req, res) => {
  const { _id } = req.params;
  const items = [];
  try {
    const sheet = await Sheet.findById(_id);
    if (sheet) {
      for (let index = 0; index < sheet.itemsIds.length; index++) {
        const itemId = sheet.itemsIds[index];
        const item = await Item.findById(itemId);
        // items.push({ id: item?._id, item: item?.item });
        items.push({ id: item?._id, item: item?.item });
      }
    }
    res.json({ status: 200, items });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ error, message: 'something went wrong', status: 400 });
  }
};

const sheetNew: RequestHandler = async (req, res) => {
  const { sheet } = req.params;
  const newSheet = await Sheet.create({ sheet });
  res.json({ msg: 'sheet has been created', status: 200, sheet: newSheet });
};

const sheetDelete: RequestHandler = async (req, res) => {
  const { _id } = req.params;
  await Sheet.findByIdAndDelete(_id);
};

export { sheetNew, sheetFind, sheetDelete };
