import React, { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { taskListAtom } from '../../Atoms';

interface Props {
  name: string;
  type: 'text';
}

const InputField: React.FC<Props> = ({ name, type }) => {
  const [inputValue, setInputValue] = useState('');
  const [taskList, setTaskList] = useAtom(taskListAtom);

  useEffect(() => {
    let list: string[] = [];
    let ids: string[] = [];

    taskList.forEach(({ id, task }) => {
      task !== null && list.push(task);
      id !== null && ids.push(id);
      window.localStorage.setItem('taskList', list.toString());
      window.localStorage.setItem('idsList', ids.toString());
    });
  }, [taskList]);

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.currentTarget.value);
  };

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let id = (taskList.length + Math.random()).toString();
    setTaskList((prevState) => [...prevState, { id, task: inputValue }]);

    setInputValue('');
  };

  return (
    <div>
      <form className='mb-5 h-9' onSubmit={onSubmitHandler}>
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
