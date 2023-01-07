import React, { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { BACKEND_ATOM, taskListAtom } from '../../../Atoms';
import useFetch from '../../../Fetch';
const sheetId = '63610d3bca983db268d6c2bf';

interface Props {
  name: string;
  type: 'text';
}

const InputField: React.FC<Props> = ({ name, type }) => {
  const [inputValue, setInputValue] = useState('');
  const [taskList, setTaskList] = useAtom(taskListAtom);
  const [BACKEND] = useAtom(BACKEND_ATOM);

  useEffect(() => {
    console.log(taskList);

    // let list: string[] = [];
    // let ids: string[] = [];
    // taskList.forEach(({ id, task }) => {
    //   list.push(task);
    //   ids.push(id);
    //   window.localStorage.setItem('taskList', list.toString());
    //   window.localStorage.setItem('idsList', ids.toString());
    // });
  }, [taskList]);

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.currentTarget.value);
  };

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    console.log(taskList);
    event.preventDefault();
    const newTask = { task: inputValue, sheetId, taskList };
    const response = useFetch('POST', `${BACKEND}/api/task/new`, newTask);
    response?.then(({ status, _id }) => {
      console.log(taskList);
      if (status === 200) {
        setTaskList((prevState) => [
          ...prevState,
          { id: _id.toString(), task: inputValue },
        ]);
      }
    });

    setInputValue('');
  };

  return (
    <div>
      <form className='mb-4 h-9' onSubmit={onSubmitHandler}>
        <input
          className='p-1 text-xl rounded-lg bg-slate-800 text-cyan-100 peer'
          onChange={onChangeHandler}
          name={name}
          id={name}
          type={type}
          value={inputValue}
        />
        <label
          className='relative right-20 -top-8 text-xl transition-all duration-300 inline-block w-60 h-6 text-indigo-200 peer-focus-within:-top-16.5 peer-focus-within:right-8'
          htmlFor={name}
        >
          {name}
        </label>
      </form>
    </div>
  );
};

export default InputField;
