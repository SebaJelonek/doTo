import { Router } from 'express';
import { itemNew, itemDelete } from '../Controller/ItemController';

export const ItemRouter = Router();

ItemRouter.post('/api/item/delete', itemDelete);
ItemRouter.post('/api/item/new', itemNew);
