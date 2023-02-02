import React from 'react';
import deleteIcon from '../../../../assets/Icons/delete.png';

interface Props {
  deleteFun: () => void;
}

const filter = {
  filter:
    'invert(61%) sepia(95%) saturate(7464%) hue-rotate(346deg) brightness(98%) contrast(102%)',
};

export const DeleteCheckListElement: React.FC<Props> = ({ deleteFun }) => {
  return (
    <img
      className='h-10'
      style={filter}
      src={deleteIcon}
      onClick={deleteFun}
      alt='delete icon'
    />
  );
};
