import React, { useState } from 'react';
import { CheckBox } from '../CheckBox/CheckBox';
import { CheckListTask } from '../CheckListTask/CheckListTask';
import { DeleteCheckListElement } from '../DeleteCheckListElement/DeleteCheckListElement';

interface Props {
  id: string;
  task: string;
  isChecked: boolean;
  onDelete: (id: string) => void;
}

export const CheckListElement: React.FC<Props> = ({
  id,
  task,
  isChecked,
  onDelete,
}) => {
  const [checked, setChecked] = useState(isChecked);
  const [trash, setTrash] = useState(false);

  const deleteFun = () => {
    onDelete(id);
  };

  const showDeleteButton = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    checked === true && setTrash(true);
  };

  return (
    <div
      onContextMenu={showDeleteButton}
      className={`${checked ? 'bg-sky-1000' : 'bg-sky-900'} 
      mb-5 flex justify-between rounded border-t-2 p-1 transition-all`}
    >
      <CheckListTask task={task} isChecked={checked} />
      {!trash && <CheckBox checked={checked} setChecked={setChecked} />}
      {trash && <DeleteCheckListElement deleteFun={deleteFun} />}
    </div>
  );
};
