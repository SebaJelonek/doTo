import React, { useState } from 'react';

interface Props {
  src: string;
}

const Icon: React.FC<Props> = ({ src }) => {
  const [bgColor, setBgColor] = useState('bg-neutral-600');
  const blink = () => {
    setBgColor('bg-neutral-400');
    setTimeout(() => {
      setBgColor('bg-neutral-600');
    }, 550);
  };
  return (
    <div
      className={`self-center p-1 ${bgColor} transition-colors duration-500`}
      onClick={blink}
    >
      <img className='w-12' src={src} alt={src.toString()} />
    </div>
  );
};

export default Icon;
