
import { useFetch } from '../../../Fetch';
import {atomStore, intHelper} from '../../../Atoms';



interface ISubmitFunction {
  submitFunction: (
    task: string,
    deadLine: number,
    owner: string,
    priority: string,
    creatorID: number,
    BACKEND: string
  ) => void;
}

export const submitTask: ISubmitFunction['submitFunction'] = (
  task,
  deadLine,
  owner,
  priority,
  creatorID,
  BACKEND
) => {
  
  const newTask = { task, deadLine, owner, creatorID, priority};
  console.log("submitted");
  const response = useFetch('POST', `${BACKEND}/api/task`, newTask);
  response?.then((res:any) => {
    res.json().then((value:any)=>{
      // atomStore.set(intHelper, value.taskID)
      atomStore.set(intHelper, parseInt(value.taskID))
  })
  
  if (res[0] === 200) {
    console.log(res[0]);
    
    console.log("this is fine " + res.status);
  } else if (res[0]> 399 && res[0]< 599){
    console.log("this is bad " + res[0])
    res[1].then((res:string)=>{
      console.log('call Seba for help ' + res);
    })
  }
  });
};
