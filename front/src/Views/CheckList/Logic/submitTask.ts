import { useAtom } from 'jotai';
import { useFetch } from '../../../Fetch';
import { BACKEND_ATOM, UserAtom } from '../../../Atoms';

const [BACKEND_URL] = useAtom(BACKEND_ATOM);
const [user] = useAtom(UserAtom);
const creator = user.name

interface ISubmitFunction {
  submitFunction: (
    task: string,
    deadLine: number,
    owner:string,
    priority:string,
  ) => void;
}

export const submitTask: ISubmitFunction['submitFunction'] = (
  task,
  deadLine,
  owner,
  priority,
) => {
  
  const newTask = { task, deadLine, owner, creator, priority};

  const response = useFetch('POST', `${BACKEND_URL}/api/tasks`, newTask);
  response?.then(({ status, _id, error }) => {
    if (status === 200) {
    } else {
      console.log('call Seba for help ' + error);
    }
  });
};
