import React from 'react';

interface Props {
  task: string;
  isChecked: boolean;
}

const strikeNone =
  'relative top-5 w-0 border border-transparent transition-all';
const strikeGold =
  'relative top-5 w-full border border-amber-300 transition-all delay-500 duration-300 ease-in-out';

const textGold = 'text-2xl font-medium text-amber-300 transition-all';
const textBrown =
  'text-2xl font-medium text-amber-800 transition-all duration-300';

export const CheckListTask: React.FC<Props> = ({ task, isChecked }) => {
  return (
    <div>
      <div>
        <hr className={isChecked ? strikeGold : strikeNone} />
        <p className={isChecked ? textBrown : textGold} id='task-text'>
          {task}
        </p>
      </div>
    </div>
  );
};
