import React, { useState } from 'react';
import checkMark from '../../../assets/Icons/draw-check-mark.png';

interface Props {
  id: string;
  task: string;
  isChecked: boolean;
}

export const CheckListElement: React.FC<Props> = ({ id, task, isChecked }) => {
  const [checked, setChecked] = useState(isChecked);

  return (
    <div
      className={` ${checked ? 'bg-sky-1000' : 'bg-sky-900'} 
      mb-5 flex justify-between rounded border-t-2 p-1 transition-all`}
    >
      {!checked ? (
        <div>
          <hr className='relative top-5 w-0 border border-transparent transition-all' />
          <p
            className='text-2xl font-medium text-amber-300 transition-all'
            id={id}
          >
            {task}
          </p>
        </div>
      ) : (
        <div>
          <hr className='relative top-5 w-full border border-amber-300 transition-all delay-500 duration-300 ease-in-out' />
          <p
            className='text-2xl font-medium text-amber-800 transition-all duration-300'
            id={id}
          >
            {task}
          </p>
        </div>
      )}
      <div
        onClick={() => {
          setChecked(!checked);
        }}
        className='flex h-10 w-10 items-center justify-center rounded-sm border-2 border-red-300 bg-red-100'
        id='checkBox2'
      >
        {checked ? (
          <img
            className='h-8 opacity-100 transition-all duration-300'
            style={{
              filter:
                'invert(16%) sepia(99%) saturate(3337%) hue-rotate(254deg) brightness(52%) contrast(120%)',
            }}
            src={checkMark}
          />
        ) : (
          <img
            className='h-8 opacity-0 transition-all duration-300'
            style={{
              filter:
                'invert(16%) sepia(99%) saturate(3337%) hue-rotate(254deg) brightness(52%) contrast(120%)',
            }}
            src={checkMark}
          />
        )}
      </div>
    </div>
  );
};
