import { useAtom } from 'jotai';
import { useFetch } from '../../../Fetch';
import { BACKEND_ATOM, UserAtom } from '../../../Atoms';

const [BACKEND_URL] = useAtom(BACKEND_ATOM);

interface IDeleteTask {
  deleteTask: (
    _id: number,
  ) => void;
}

export const deleteTask: IDeleteTask['deleteTask'] = (
  _id,
  ) => {
  console.log('task ' + _id + ' has been deleted');
  const response = useFetch('POST', `${BACKEND_URL}/api/task/delete`, {
    _id,
  });

  response?.then((res) => {
    console.log(res);
  });
};
