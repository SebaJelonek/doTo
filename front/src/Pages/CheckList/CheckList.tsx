import React from 'react';

interface Props {
  height: number;
}

const CheckList: React.FC<Props> = ({ height }) => {
  return (
    <div style={{ minHeight: height - 56 }}>
      <h1 className='text-5xl text-rose-400'>This is check list</h1>
    </div>
  );
};

export default CheckList;
