import React, { useState } from 'react';

interface Props {
  name: string;
  type: 'text';
  onSubmitHandler: (inputValue: string) => void;
}

const InputField: React.FC<Props> = ({ name, type, onSubmitHandler }) => {
  const [inputValue, setInputValue] = useState('');

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.currentTarget.value);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmitHandler(inputValue);
    setInputValue('');
  };

  return (
    <div>
      <form className='mb-4 h-9' onSubmit={onSubmit}>
        <input
          className='peer rounded-lg bg-slate-800 p-1 text-xl text-cyan-100'
          onChange={onChangeHandler}
          name={name}
          id={name}
          type={type}
          value={inputValue}
        />
        <label
          className={`relative inline-block h-6 w-60 text-xl text-indigo-200 transition-all duration-300 peer-focus-within:-top-16.5 peer-focus-within:right-8 ${
            inputValue === '' ? 'right-20 -top-8' : 'right-8 -top-16.5'
          }`}
          htmlFor={name}
        >
          {name}
        </label>
      </form>
    </div>
  );
};

export default InputField;
