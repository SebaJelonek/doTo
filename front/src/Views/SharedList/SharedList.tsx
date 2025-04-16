import { useAtom } from 'jotai';
import React from 'react';
import { heightAtom, widthAtom } from '../../Atoms';
import InputField from '../../components/Form/InputField';

const SharedList: React.FC = () => {
  const [width] = useAtom(widthAtom);
  const [height] = useAtom(heightAtom);

  return (
    <div
      className='p-8 pt-7 pb-0'
      style={{ minHeight: height - 56, minWidth: width }}
    >
      <h2 className='mb-4 text-4xl text-emerald-400'>Shared list is empty</h2>
      <h2 className='mb-8 text-3xl text-emerald-400'>Add new task below</h2>
      {/* <InputField name='Task' type='text' /> */}
    </div>
  );
};

export default SharedList;
