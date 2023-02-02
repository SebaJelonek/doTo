import React from 'react';
import checkMark from '../../../../assets/Icons/draw-check-mark.png';

interface Props {
  checked: boolean;
  setChecked: React.Dispatch<React.SetStateAction<boolean>>;
}

const filter = {
  filter:
    'invert(16%) sepia(99%) saturate(3337%) hue-rotate(254deg) brightness(52%) contrast(120%)',
};

export const CheckBox: React.FC<Props> = ({ checked, setChecked }) => {
  const clickHandler = () => {
    setChecked(!checked);
  };

  return (
    <div
      onClick={clickHandler}
      className='flex h-10 w-10 items-center justify-center rounded-sm border-2 border-red-300 bg-red-100'
    >
      <img
        className={`${checked ? 'opacity-100' : 'opacity-0'}
        h-8 transition-all duration-300`}
        style={filter}
        src={checkMark}
      />
    </div>
  );
};
