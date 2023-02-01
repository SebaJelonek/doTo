import { atom } from 'jotai';

const ids = window.localStorage.getItem('idsList')?.split(',');
const tasks = window.localStorage.getItem('taskList')?.split(',');

const initialData: { id: string; item: string }[] = [];

// if (ids !== undefined && tasks !== undefined) {
//   for (let index = 0; index < ids.length; index++) {
//     const taskObject = { id: ids[index], task: tasks[index] };
//     initialData.push(taskObject);
//   }
// }
const SheetIDAtom = atom('63da5d9e88970ccfe148df67');
const BACKEND_ATOM = atom('http://localhost:1337');

// const SheetIDAtom = atom('63610d3bca983db268d6c2bf');
// const BACKEND_ATOM = atom('https://dotoback.onrender.com');
const sheetEmptyAtom = atom(true);
const textAtom = atom('');
const idAtom = atom(1);
const shoppingListAtom = atom(initialData);
const marginLeftAtom = atom(0);
const heightAtom = atom(window.screen.height);
const widthAtom = atom(window.screen.width);
const scaleAtom = atom(1);

export {
  textAtom,
  idAtom,
  shoppingListAtom,
  BACKEND_ATOM,
  sheetEmptyAtom,
  marginLeftAtom,
  heightAtom,
  widthAtom,
  scaleAtom,
  SheetIDAtom,
};
