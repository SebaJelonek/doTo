
import { useFetch } from '../../../Fetch';




interface ISubmitFunction {
  submitFunction: (
    task: string,
    deadLine: number,
    owner: string,
    priority: string,
    creator: string,
    BACKEND: string
  ) => void;
}

export const submitTask: ISubmitFunction['submitFunction'] = (
  task,
  deadLine,
  owner,
  priority,
  creator,
  BACKEND
) => {
  
  const newTask = { task, deadLine, owner, creator, priority};

  const response = useFetch('POST', `${BACKEND}/api/tasks`, newTask);
  response?.then(({ status, _id, error }) => {
    if (status === 200) {
    } else {
      console.log('call Seba for help ' + error);
    }
  });
};
