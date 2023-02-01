import { useAtom } from 'jotai';
import React, { Fragment, useState } from 'react';
import { heightAtom, widthAtom } from '../../Atoms';
import { CheckListElement } from './CheckListElement/CheckListElement';
import Form from '../../components/Form/Form';
let taskArray: {
  id: string;
  task: string;
  isChecked: boolean;
}[];
const initialTaskArray = [
  { id: '1', task: 'This is task one', isChecked: true },
  { id: '2', task: 'This is task two', isChecked: true },
  { id: '3', task: 'This is task three', isChecked: false },
  { id: '4', task: 'This is task four', isChecked: false },
  { id: '5', task: 'This is task five', isChecked: false },
];
const CheckList: React.FC = () => {
  const [width] = useAtom(widthAtom);
  const [height] = useAtom(heightAtom);

  const [taskArray, setTaskArray] = useState(initialTaskArray);

  const submitHandler = (inputValue: string) =>
    setTaskArray((prevState) => [
      ...prevState,
      {
        id: (parseInt(prevState[prevState.length - 1].id) + 1).toString(),
        task: inputValue,
        isChecked: false,
      },
    ]);

  return (
    <div
      className='p-8 pt-7 pb-0'
      style={{ minHeight: height - 56, minWidth: width }}
    >
      {taskArray.length < 1 && (
        <Fragment>
          <h2 className='mb-4 text-4xl text-rose-400'>Check list is empty</h2>
          <h2 className='mb-8 text-3xl text-rose-400'>Add new task below</h2>
        </Fragment>
      )}
      <Form name='Enter task' type='text' onSubmitHandler={submitHandler} />
      {taskArray.map(({ id, task, isChecked }) => (
        <CheckListElement key={id} id={id} task={task} isChecked={isChecked} />
      ))}
    </div>
  );
};

export default CheckList;
