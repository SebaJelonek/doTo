import { useAtom } from "jotai";
import React, { Fragment, useEffect, useState } from "react";
import { AuthTokenAtom, heightAtom, widthAtom } from "../../Atoms";
import { CheckListElement } from "./Layout/CheckListElement/CheckListElement";
import { useFetchTasks } from "./Logic/useFetchTasks";
import { submitTask } from "./Logic/submitTask";
import { deleteTask } from "./Logic/deleteTask";
import deleteIcon from "../../assets/Icons/delete.png";
import { MultInput } from "./Layout/MultInput/MultInput";
import { BACKEND_ATOM, UserAtom, intHelper } from "../../Atoms";

let taskArrayType: {
  id: number;
  task: string;
  isChecked: boolean;
  isDeleted: boolean;
  deadline: number;
  owner: string;
  creatorID: number;
  priority: string;
}[];

const CheckList: React.FC = () => {
  const fetchedTasks = useFetchTasks();
  const [taskArray, setTaskArray] = useState(taskArrayType);
  const [taskID, setTaskID] = useState(0);
  const [width] = useAtom(widthAtom);
  const [height] = useAtom(heightAtom);
  const pageStyle = { minHeight: height - 56, minWidth: width };
  const [BACKEND] = useAtom(BACKEND_ATOM);
  const [user] = useAtom(UserAtom);
  const [id] = useAtom(intHelper);
  const creatorID = user.id;

  useEffect(() => {
    setTaskArray(fetchedTasks);
  }, [fetchedTasks]);

  useEffect(() => {
    if (id === 0) {
      return;
    } else {
      setTaskArray((prevState) =>
        prevState.map((obj) => {
          if (obj.id === taskID) {
            console.log(obj);
            return { ...obj, id: id };
            // Create new object with new ID
          }
          return obj;
        })
      );
    }

    console.log(id);
    console.log(taskArray);
  }, [id]);

  const submitHandler = (
    taskName: string,
    owner: string,
    deadline: number,
    priority: string
  ) => {
    submitTask(taskName, deadline, owner, priority, creatorID, BACKEND);
    const id = Math.random() * 1000;
    setTaskID(id);
    // checking if task array is undefined(empty) or null
    taskArray === undefined || taskArray === null
      ? // if it is, we push an array into it

        setTaskArray([
          {
            id,
            task: taskName,
            isChecked: false,
            isDeleted: false,
            deadline,
            owner,
            creatorID,
            priority,
          },
        ])
      : // if it is not, we update the state with a arrow function
        setTaskArray((prevState) => [
          ...prevState,
          {
            id,
            task: taskName,
            isChecked: false,
            isDeleted: false,
            deadline,
            owner,
            creatorID,
            priority,
          },
        ]);
    console.log(taskArray);
  };

  const onDelete = (id: number, isDeleted: boolean) => {
    deleteTask(id, isDeleted, BACKEND);
    setTaskArray(taskArray.filter(({ id: _id }) => _id !== id));
  };

  return (
    <div className="p-8 pb-0 pt-7" style={pageStyle}>
      {taskArray === undefined || taskArray === null ? (
        <Fragment>
          <h2 className="mb-4 text-4xl text-rose-400">Check list is empty</h2>
          <h2 className="mb-8 text-3xl text-rose-400">Add new task below</h2>
          <MultInput onSubmit={submitHandler} />
        </Fragment>
      ) : (
        <Fragment>
          <MultInput onSubmit={submitHandler} />

          {taskArray.map(
            ({ id, task, isChecked, isDeleted, deadline, owner, priority }) => {
              if (!isDeleted)
                return (
                  <CheckListElement
                    key={id}
                    id={id}
                    task={task}
                    isChecked={isChecked}
                    isDeleted={isDeleted}
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
