import React, { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import InputField from '../InputField/InputField';
import TaskContainer from '../TaskContainer/TaskContainer';
import { BACKEND_ATOM, sheetEmptyAtom, taskListAtom } from '../../../Atoms';
import useFetch from '../../../Fetch';

const sheetId = '63610d3bca983db268d6c2bf';

const Sheet: React.FC = () => {
  const [height, setHeight] = useState(0);
  const [taskList, setTaskList] = useAtom(taskListAtom);
  const [sheetEmpty, setSheetEmpty] = useAtom(sheetEmptyAtom);
  const [BACKEND] = useAtom(BACKEND_ATOM);

  useEffect(() => {
    const windowHeight = () => {
      setHeight(window.screen.height);
    };

    const response = useFetch('GET', `${BACKEND}/api/sheet/${sheetId}`);
    response?.then(({ status, message, tasks }) => {
      if (status === 200 && tasks.length > 0) {
        setSheetEmpty(false);
        setTaskList(tasks);
      } else {
        setSheetEmpty(true);
      }
    });
    windowHeight();
  }, []);

  return (
    <div className='p-8 pt-6 pb-0' style={{ minHeight: height - 56 }}>
      {!sheetEmpty ? (
        <div key={sheetId}>
          <InputField name='Task name' type='text' />
          <TaskContainer list={taskList} />
        </div>
      ) : (
        <div>
          <h2 className='text-4xl text-amber-300 mb-4'>Task list is empty</h2>
          <h2 className='text-3xl text-amber-300 mb-8'>Add new task below</h2>
          <InputField name='Task name' type='text' />
        </div>
      )}
    </div>
  );
};

export default Sheet;
