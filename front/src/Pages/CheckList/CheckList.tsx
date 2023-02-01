import React from 'react';
import InputField from '../../components/InputField/InputField';

interface Props {
  height: number;
  width: number;
}

const CheckList: React.FC<Props> = ({ height, width }) => {
  return (
    <div
      className='p-8 pt-7 pb-0'
      style={{ minHeight: height - 56, minWidth: width }}
    >
      <h2 className='text-4xl text-rose-400 mb-4'>Check list is empty</h2>
      <h2 className='text-3xl text-rose-400 mb-8'>Add new task below</h2>
      <InputField name='Task name' type='text' />
    </div>
  );
};

export default CheckList;
