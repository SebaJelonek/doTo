import { useFetch } from '../../../Fetch';

interface ISubmitFunction {
  submitFunction: (
    task: string,
    createDate: number,
    sheetId: string,
    BACKEND: string
  ) => void;
}

export const submitTask: ISubmitFunction['submitFunction'] = (
  task,
  createDate,
  sheetId,
  BACKEND
) => {
  const newTask = { task, createDate, sheetId };

  const response = useFetch('POST', `${BACKEND}/api/task/new`, newTask);
  response?.then(({ status, _id, error }) => {
    if (status === 200) {
    } else {
      console.log('call Seba for help ' + error);
    }
  });
};
