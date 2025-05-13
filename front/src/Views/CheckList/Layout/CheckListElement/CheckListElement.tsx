import React, { useState } from 'react';
import { CheckBox } from '../CheckBox/CheckBox';
import { CheckListTask } from '../CheckListTask/CheckListTask';
import { DeleteCheckListElement } from '../DeleteCheckListElement/DeleteCheckListElement';
import {LabelContainer} from '../Lable/LabelContainer';


  


interface Props {
  id: number;
  task: string;
  isChecked: boolean;
  deadline: number;
  owner: string;
  priority:string;
  onDelete: (id: number, deadline: number) => void;
}

export const CheckListElement: React.FC<Props> = ({
  id,
  task,
  isChecked,
  owner,
  priority,
  deadline,
  onDelete,
}) => {
  const [checked, setChecked] = useState(isChecked);
  const [trash, setTrash] = useState(false);
  const deadlineString = deadline.toString()
  const labels = {owner, priority, deadline:deadlineString}  

  const deleteFunc = () => {
    onDelete(id, deadline);
  };

  const showDeleteButton = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    checked === true && setTrash(!trash);
  };
  return (
    <div className='flex flex-col mb-5'>
      <div
        className={`${checked ? 'bg-sky-1000' : 'bg-sky-900'} 
        flex justify-between rounded border-t-2 p-1 transition-all`}
      >
        <CheckListTask task={task} isChecked={checked} />
        {!trash && <CheckBox onContextMenu={showDeleteButton} checked={checked} setChecked={setChecked} />}
        {trash && <DeleteCheckListElement deleteFunc={deleteFunc} />}
      </div>
      <LabelContainer labels={labels} checked={checked}/>
    </div>
  );
};
