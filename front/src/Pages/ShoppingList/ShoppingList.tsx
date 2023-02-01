import React, { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import InputField from '../../components/InputField/InputField';
import TaskContainer from './ShoppingListContainer/ShoppingListContainer';
import { BACKEND_ATOM, sheetEmptyAtom, taskListAtom } from '../../Atoms';
import useFetch from '../../Fetch';

const sheetId = '63610d3bca983db268d6c2bf';

interface Props {
  height: number;
  width: number;
}

const ShoppingList: React.FC<Props> = ({ height, width }) => {
  const [taskList, setTaskList] = useAtom(taskListAtom);
  const [sheetEmpty, setSheetEmpty] = useAtom(sheetEmptyAtom);
  const [BACKEND] = useAtom(BACKEND_ATOM);

  useEffect(() => {
    const response = useFetch('GET', `${BACKEND}/api/sheet/${sheetId}`);
    response?.then(({ status, message, tasks }) => {
      if (status === 200 && tasks.length > 0) {
        setSheetEmpty(false);
        setTaskList(tasks);
      } else {
        setSheetEmpty(true);
      }
    });
  }, []);

  return (
    <div
      className='p-8 pt-7 pb-0'
      style={{ minHeight: height - 56, minWidth: width }}
    >
      {!sheetEmpty ? (
        <div key={sheetId}>
          <InputField name='Item name' type='text' />
          <TaskContainer list={taskList} />
        </div>
      ) : (
        <div>
          <h2 className='text-4xl text-amber-300 mb-4'>
            Shopping list is empty
          </h2>
          <h2 className='text-3xl text-amber-300 mb-8'>Add new item below</h2>
          <InputField name='Item name' type='text' />
        </div>
      )}
    </div>
  );
};

export default ShoppingList;
