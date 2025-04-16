import { useFetch } from '../../../Fetch';

interface IDeleteTask {
  deleteTask: (
    _id: string,
    createDate: number,
    sheetId: string,
    BACKEND: string
  ) => void;
}

export const deleteTask: IDeleteTask['deleteTask'] = (
  _id,
  createDate,
  sheetId,
  BACKEND
) => {
  console.log('task ' + _id + ' has been deleted');
  const response = useFetch('POST', `${BACKEND}/api/task/delete`, {
    _id,
    createDate,
    sheetId,
  });

  response?.then((res) => {
    console.log(res);
  });
};
