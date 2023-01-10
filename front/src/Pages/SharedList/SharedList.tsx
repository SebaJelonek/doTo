import React from 'react';

interface Props {
  height: number;
}

const SharedList: React.FC<Props> = ({ height }) => {
  return (
    <div style={{ minHeight: height - 56 }}>
      <h1 className='text-5xl text-emerald-400'>This is shared list</h1>
    </div>
  );
};

export default SharedList;
