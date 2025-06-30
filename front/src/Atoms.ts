import { atom } from 'jotai';
import { createStore } from 'jotai/vanilla';

const atomStore = createStore()

const ids = window.localStorage.getItem('idsList')?.split(',');
const tasks = window.localStorage.getItem('taskList')?.split(',');

const newTasks = [1, 2, 3, 4]

const initialData: { id: string; name: string }[] = [];
const user: {id: number, name: string, email: string} = 
{
  id:0,
  name:"Seba",
  email:"kontaktowanie@gmail.com",
}

// if (ids !== undefined && tasks !== undefined) {
//   for (let index = 0; index < ids.length; index++) {
//     const taskObject = { id: ids[index], task: tasks[index] };
//     initialData.push(taskObject);
//   }
// }

const UserAtom = atom(user)
const AuthTokenAtom = atom<string | undefined>(undefined)

const BACKEND_ATOM = atom('http://localhost:3000'); // local-dev

// const BACKEND_ATOM = atom('https://dotoback.onrender.com'); // production

const textAtom = atom('');
const intHelper = atom(0);
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
  
  marginLeftAtom,
  heightAtom,
  widthAtom,
  scaleAtom,
  
  UserAtom,
  AuthTokenAtom,
  atomStore,
  intHelper
};
