import React, { useState } from 'react';

interface Props {
  src: string;
  currentSite: (site: string) => void;
  active: string;
}

const Icon: React.FC<Props> = ({ src, currentSite, active }) => {
  const [bgColor, setBgColor] = useState('bg-neutral-600');
  let isActive;
  if (active === src) isActive = { backgroundColor: '#a3a3a3' };
  const blink = () => {
    setBgColor('bg-neutral-400');
    setTimeout(() => {
      setBgColor('bg-neutral-600');
    }, 1050);
    currentSite(src);
  };

  return (
    <div
      className={`self-center py-1 ${bgColor} rounded-md transition-colors duration-1000`}
      style={isActive}
      onClick={blink}
    >
      <img className='w-12' src={src} alt={src.toString()} />
    </div>
  );
};

export default Icon;
