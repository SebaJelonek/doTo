import React, { Fragment, useState } from 'react';
import { CheckBox } from '../CheckBox/CheckBox';
import { CheckListTask } from '../CheckListTask/CheckListTask';
import { DeleteCheckListElement } from '../DeleteCheckListElement/DeleteCheckListElement';
import {LabelContainer} from '../Lable/LabelContainer';

const labelArray:[{type:"owner", text:string, id:number}, {type:"deadline",text:string,id:number}, {type:"priority",text:string,id:number}] = [{type:"owner",text:"Seba", id:1}, {type:"deadline",text:"2025-04-18T16:34",id:2}, {type:"priority",text:"Do",id:3}]


interface Props {
  id: number;
  task: string;
  isChecked: boolean;
  deadLine: number;
  onDelete: (id: number, deadLine: number) => void;
}

export const CheckListElement: React.FC<Props> = ({
  id,
  task,
  isChecked,
  deadLine,
  onDelete,
}) => {
  const [checked, setChecked] = useState(isChecked);
  const [trash, setTrash] = useState(false);
  

  const deleteFunc = () => {
    onDelete(id, deadLine);
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
      <LabelContainer labelArray={labelArray} checked={checked}/>
    </div>
  );
};
