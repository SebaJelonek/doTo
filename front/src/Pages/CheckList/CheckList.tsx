import { useAtom } from 'jotai';
import React, { Fragment, useEffect, useState } from 'react';
import { BACKEND_ATOM, heightAtom, SheetIDAtom, widthAtom } from '../../Atoms';
import { CheckListElement } from './Layout/CheckListElement/CheckListElement';
import { useFetchTasks } from './Logic/useFetchTasks';
import { submitTask } from './Logic/submitTask';
import { deleteTask } from './Logic/deleteTask';
import deleteIcon from '../../assets/Icons/delete.png';
import Form from '../../components/Form/InputField';

let taskArrayType: {
  id: string;
  task: string;
  isChecked: boolean;
  createDate: string;
}[];

const CheckList: React.FC = () => {
  const fetchedTasks = useFetchTasks();
  const [taskArray, setTaskArray] = useState(taskArrayType);
  const [width] = useAtom(widthAtom);
  const [height] = useAtom(heightAtom);
  const [sheetID] = useAtom(SheetIDAtom);
  const [BACKEND] = useAtom(BACKEND_ATOM);

  const pageStyle = { minHeight: height - 56, minWidth: width };

  useEffect(() => {
    setTaskArray(fetchedTasks);
  }, [fetchedTasks]);

  const submitHandler = (inputValue: string) => {
    const createDate = Date.now();
    submitTask(inputValue, createDate, sheetID, BACKEND);
    setTaskArray((prevState) => [
      ...prevState,
      {
        id: createDate.toString(),
        task: inputValue,
        isChecked: false,
        createDate: createDate.toString(),
      },
    ]);
  };

  const onDelete = (_id: string, createDate: number) => {
    deleteTask(_id, createDate, sheetID, BACKEND);
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
          <Form name='Enter task' type='text' onSubmitHandler={submitHandler} />
          {taskArray.map(({ id, task, isChecked, createDate }) => {
            console.log(createDate);
            return (
              <CheckListElement
                key={id}
                id={id}
                task={task}
                isChecked={isChecked}
                createDate={parseInt(createDate)}
                onDelete={onDelete}
              />
            );
          })}
        </Fragment>
      )}
      <img src={deleteIcon} className='opacity-0' alt='' />
    </div>
  );
};

export default CheckList;
