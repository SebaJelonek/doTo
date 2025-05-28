import { useAtom } from 'jotai';
import { useFetch } from '../../../Fetch';


interface IDeleteTask {
  deleteTask: (
    id: number,
    BACKEND: string
  ) => void;
}

export const deleteTask: IDeleteTask['deleteTask'] = (
  id,
  BACKEND
  ) => {
  console.log('task ' + id + ' has been deleted');
  const response = useFetch('POST', `${BACKEND}/api/task/delete`, {
    id,
  });

  response?.then((res) => {
    console.log(res);
  });
};
