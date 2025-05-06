import { useAtom } from 'jotai';
import { useFetch } from '../../../Fetch';


interface IDeleteTask {
  deleteTask: (
    _id: number,
    BACKEND: string
  ) => void;
}

export const deleteTask: IDeleteTask['deleteTask'] = (
  _id,
  BACKEND
  ) => {
  console.log('task ' + _id + ' has been deleted');
  const response = useFetch('POST', `${BACKEND}/api/task/delete`, {
    _id,
  });

  response?.then((res) => {
    console.log(res);
  });
};
