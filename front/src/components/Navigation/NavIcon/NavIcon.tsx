import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import getURL from './getURL';

interface Props {
  src: string;
}

const Icon: React.FC<Props> = ({ src }) => {
  const [bgColor, setBgColor] = useState('bg-neutral-600');
  const URL = getURL(src);

  const blink = () => {
    setBgColor('bg-neutral-400');
    setTimeout(() => {
      setBgColor('bg-neutral-600');
    }, 1050);
  };

  return (
    <Link to={URL}>
      <div
        className={`self-center py-1 ${bgColor} rounded-md transition-colors duration-1000`}
        onClick={blink}
      >
        <img className='w-12' src={src} alt={src.toString()} />
      </div>
    </Link>
  );
};

export default Icon;
