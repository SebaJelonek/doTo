import React, { useState } from "react";
import { CheckBox } from "../CheckBox/CheckBox";
import { CheckListTask } from "../CheckListTask/CheckListTask";
import { DeleteCheckListElement } from "../DeleteCheckListElement/DeleteCheckListElement";
import { LabelContainer } from "../Lable/LabelContainer";
import { completeTask } from "../../Logic/completeTask";

interface Props {
  id: number;
  task: string;
  isChecked: boolean;
  isDeleted: boolean;
  deadline: number;
  owner: string;
  priority: string;
  onDelete: (id: number, isDeleted: boolean) => void;
  BACKEND: string;
}

export const CheckListElement: React.FC<Props> = ({
  id,
  task,
  isChecked,
  isDeleted,
  owner,
  priority,
  deadline,
  onDelete,
  BACKEND,
}) => {
  const [checked, setChecked] = useState(isChecked);
  const [trash, setTrash] = useState(false);
  const deadlineString = deadline.toString();
  const labels = { owner, priority, deadline: deadlineString };

  const completeFunc = () => {
    completeTask(id, !checked, BACKEND);
  };

  const deleteFunc = () => {
    onDelete(id, !isDeleted);
  };

  const showDeleteButton = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    checked === true && setTrash(!trash);
  };

  return (
    <div className="mb-5 flex flex-col">
      <div
        className={`${checked ? "bg-sky-1000" : "bg-sky-900"} 
        flex justify-between rounded border-t-2 p-1 transition-all`}
      >
        <CheckListTask task={task} isChecked={checked} />
        {!trash && (
          <CheckBox
            onContextMenu={showDeleteButton}
            checked={checked}
            setChecked={setChecked}
            completeFunc={completeFunc}
          />
        )}
        {trash && <DeleteCheckListElement deleteFunc={deleteFunc} />}
      </div>
      <LabelContainer labels={labels} checked={checked} />
    </div>
  );
};
