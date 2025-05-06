import { useAtom } from 'jotai';
import React, { Fragment, useEffect, useState } from 'react';
import { heightAtom,  widthAtom } from '../../Atoms';
import { CheckListElement } from './Layout/CheckListElement/CheckListElement';
import { useFetchTasks } from './Logic/useFetchTasks';
import { submitTask } from './Logic/submitTask';
import { deleteTask } from './Logic/deleteTask';
import deleteIcon from '../../assets/Icons/delete.png';
import Form from '../../components/Form/InputField';
import { MultInput } from './Layout/MultInput/MultInput';
import { BACKEND_ATOM, UserAtom } from '../../Atoms';


let taskArrayType: { id: number; task: string; isChecked: boolean; deadLine: number, owner: string, creator: string, priority: string }[];

const CheckList: React.FC = () => {
  const fetchedTasks = useFetchTasks();
  const [taskArray, setTaskArray] = useState(taskArrayType);
  const [width] = useAtom(widthAtom);
  const [height] = useAtom(heightAtom);
  const pageStyle = { minHeight: height - 56, minWidth: width };
  const [BACKEND] = useAtom(BACKEND_ATOM);
  const [user] = useAtom(UserAtom);
  const creator = user.name

  useEffect(() => {
    setTaskArray(fetchedTasks);
  }, [fetchedTasks]);

  const submitHandler = (taskName:string, owner:string, deadLine:number, priority: string) => {
    const createDate = Date.now();
    submitTask(taskName, deadLine, owner, priority, creator, BACKEND);
    setTaskArray((prevState) => [
      ...prevState,
      {
        id: Math.random()*1000,
        task: taskName,
        isChecked: false,
        deadLine: Date.now(),
        owner: "Seba",
        creator: "Ada",
        priority: "high"
      },
    ]);
  };

  const onDelete = (_id: number, createDate: number) => {
    deleteTask(_id, BACKEND);
    setTaskArray(taskArray.filter(({ id }) => id !== _id));
  };

  return (
    <div className='p-8 pt-7 pb-0' style={pageStyle}>
      {taskArray === undefined ? (
        <Fragment>
          <h2 className='mb-4 text-4xl text-rose-400'>Check list is empty</h2>
          <h2 className='mb-8 text-3xl text-rose-400'>Add new task below</h2>
        </Fragment>
      ) : (
        <Fragment>
          <MultInput onSubmit={submitHandler}/>
          {/* <Form name='Enter task' type='text' onSubmitHandler={submitHandler} /> */}
          {taskArray.map(({ id, task, isChecked, deadLine }) => {
          
            return (
              <CheckListElement
                key={id}
                id={id}
                task={task}
                isChecked={isChecked}
                deadLine={deadLine}
                onDelete={onDelete}
              />
            );
          })}
        </Fragment>
      )}
      {/* <img src={deleteIcon} className='opacity-0' alt='' /> */}
    </div>
  );
};

export default CheckList;
