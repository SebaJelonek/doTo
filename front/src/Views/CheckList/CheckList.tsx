import { useAtom } from "jotai";
import React, { Fragment, useEffect, useState } from "react";
import { heightAtom, widthAtom } from "../../Atoms";
import { CheckListElement } from "./Layout/CheckListElement/CheckListElement";
import { useFetchTasks } from "./Logic/useFetchTasks";
import { submitTask } from "./Logic/submitTask";
import { deleteTask } from "./Logic/deleteTask";
import deleteIcon from "../../assets/Icons/delete.png";
import { MultInput } from "./Layout/MultInput/MultInput";
import { BACKEND_ATOM, UserAtom } from "../../Atoms";

let taskArrayType: {
  id: number;
  task: string;
  isChecked: boolean;
  deadline: number;
  owner: string;
  creatorID: number;
  priority: string;
}[];

const CheckList: React.FC = () => {
  const fetchedTasks = useFetchTasks();
  const [taskArray, setTaskArray] = useState(taskArrayType);
  const [width] = useAtom(widthAtom);
  const [height] = useAtom(heightAtom);
  const pageStyle = { minHeight: height - 56, minWidth: width };
  const [BACKEND] = useAtom(BACKEND_ATOM);
  const [user] = useAtom(UserAtom);
  const creatorID = user.id;

  useEffect(() => {
    setTaskArray(fetchedTasks);
  }, [fetchedTasks]);

  const submitHandler = (
    taskName: string,
    owner: string,
    deadline: number,
    priority: string
  ) => {
    submitTask(taskName, deadline, owner, priority, creatorID, BACKEND);
    taskArray === undefined // checking if task array is undefined(empty)
      ? setTaskArray([
          {
            id: Math.random() * 1000,
            task: taskName,
            isChecked: false,
            deadline,
            owner,
            creatorID,
            priority,
          },
        ]) // if it is, we push an array into it
      : setTaskArray((prevState) => [
          ...prevState,
          {
            id: Math.random() * 1000,
            task: taskName,
            isChecked: false,
            deadline,
            owner,
            creatorID,
            priority,
          },
        ]); // if it is not, we update the state with a arrow function
  };

  const onDelete = (_id: number, createDate: number) => {
    deleteTask(_id, BACKEND);
    setTaskArray(taskArray.filter(({ id }) => id !== _id));
  };

  return (
    <div className="p-8 pt-7 pb-0" style={pageStyle}>
      {taskArray === undefined ? (
        <Fragment>
          <h2 className="mb-4 text-4xl text-rose-400">Check list is empty</h2>
          <h2 className="mb-8 text-3xl text-rose-400">Add new task below</h2>
          <MultInput onSubmit={submitHandler} />
        </Fragment>
      ) : (
        <Fragment>
          <MultInput onSubmit={submitHandler} />
          {/* <Form name='Enter task' type='text' onSubmitHandler={submitHandler} /> */}
          {taskArray.map(
            ({ id, task, isChecked, deadline, owner, priority }) => {
              return (
                <CheckListElement
                  key={id}
                  id={id}
                  task={task}
                  isChecked={isChecked}
                  owner={owner}
                  priority={priority}
                  deadline={deadline}
                  onDelete={onDelete}
                  BACKEND={BACKEND}
                />
              );
            }
          )}
        </Fragment>
      )}
      {/* <img src={deleteIcon} className='opacity-0' alt='' /> */}
    </div>
  );
};

export default CheckList;
