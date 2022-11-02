import { atom } from 'jotai';

const ids = window.localStorage.getItem('idsList')?.split(',');
const tasks = window.localStorage.getItem('taskList')?.split(',');

const initialData: { id: string; task: string }[] = [];

// if (ids !== undefined && tasks !== undefined) {
//   for (let index = 0; index < ids.length; index++) {
//     const taskObject = { id: ids[index], task: tasks[index] };
//     initialData.push(taskObject);
//   }
// }

const BACKEND_ATOM = atom('https://dotoback.onrender.com');
const sheetEmptyAtom = atom(true);
const textAtom = atom('');
const idAtom = atom(1);
const taskListAtom = atom(initialData);

export { textAtom, idAtom, taskListAtom, BACKEND_ATOM, sheetEmptyAtom };
