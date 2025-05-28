import { useFetch } from '../../../Fetch';


interface ICompleteTask {
  completeTask: (
    id: number,
    checked: boolean,
    BACKEND: string
  ) => void;
}

export const completeTask: ICompleteTask['completeTask'] = (
  id,
  checked,
  BACKEND
  ) => {
  console.log('task ' + id + ' has been marked complete');
  console.log(checked);
  
  const response = useFetch('PUT', `${BACKEND}/api/finish-task`, {
    id, checked
  });

  response?.then((res) => {
    console.log(res);
  });
};
