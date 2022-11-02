import { Router } from 'express';

import {
  sheetFind,
  sheetDelete,
  sheetNew,
} from '../Controller/SheetController';
const SheetRouter = Router();

SheetRouter.get('/api/sheet/new/:sheet', sheetNew); //sheet
SheetRouter.get('/api/sheet/delete/:_id', sheetDelete);
SheetRouter.get('/api/sheet/:_id', sheetFind); //sheet

export default SheetRouter;
