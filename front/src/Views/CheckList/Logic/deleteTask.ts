import { useFetch } from '../../../Fetch';


interface IDeleteTask {
  deleteTask: (
    id: number,
    isDeleted: boolean,
    BACKEND: string
  ) => void;
}

export const  deleteTask: IDeleteTask['deleteTask'] = (
  id,
  isDeleted,
  BACKEND
  ) => {
  console.log('task ' + id + ' has been deleted');
  const response = useFetch('POST', `${BACKEND}/api/delete-task`, {
    id, isDeleted
  });

  response?.then((res) => {
    console.log(res);
  });
};
