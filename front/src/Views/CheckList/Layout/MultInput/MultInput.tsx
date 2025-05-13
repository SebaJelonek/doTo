import React, { useEffect, useState } from "react";


interface Props {
  onSubmit: (
    taskName: string,
    owner: string,
    deadLine: number,
    priority: string
  ) => void;
}

export const MultInput: React.FC<Props> = ({ onSubmit }) => {
  const [taskName, setTaskName] = useState("");
  const [owner, setOwner] = useState("");
  const [deadLine, setDeadLine] = useState("");
  const [priority, setPriority] = useState("");
  const [priorityMarkerString, setPriorityMarkerString] = useState("")
  

  function onSubmitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    let priorityLevel
    if (parseInt(priority) < 33) { 
      priorityLevel = ("low")
    }
    else if (parseInt(priority) >= 33 && parseInt(priority) < 66) {
    priorityLevel = ("mid")
    }
    else {
    priorityLevel = ("high")
    }
    
    onSubmit(taskName, owner, Date.parse(deadLine), priorityLevel);
    setTaskName("")
    setOwner("")
    setDeadLine("")
    setPriority("")
  }
  function onNameChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setTaskName(e.currentTarget.value);
  }
  function onOwnerChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setOwner(e.currentTarget.value);
  }
  function onDeadLineChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setDeadLine(e.currentTarget.value);
  }

  function onRangeChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setPriority(e.currentTarget.value);
  }

  useEffect(()=>{
    function priorityMarker(priorityString: string) {
      const priority = parseInt(priorityString);
      if (priority < 33) { 
          setPriorityMarkerString("No")
          return "No"
        }
      else if (priority >= 33 && priority < 66) {
        setPriorityMarkerString("Maybe")
        return "Maybe"
      }
      else {
        setPriorityMarkerString("Yes")
        return "Yes"
      }
    }
    priorityMarker(priority)
  }, [priority])

  function priorityMarkerColor(priorityString: string) {
    const priority = parseInt(priorityString);
    if (priority < 33) return "text-lime-600";
    else if (priority >= 33 && priority < 66) return "text-yellow-600";
    else return "text-rose-800";
  }

  return (
    <div>
      {/* onSubmit(taskName, owner, parseInt(deadLine), priority) */}
      <form onSubmit={onSubmitHandler}>
        <div className="mb-3 flex flex-col-reverse rounded-xl border-t-2 bg-zinc-900">
          <input
            className="mb-2 w-4/5 self-center text-center"
            type="text"
            name="taskName"
            id="taskName"
            title="taskName"
            onChange={onNameChangeHandler}
          />
          <label
            className="mb-2 text-xl font-semibold text-slate-300"
            htmlFor="taskName"
          >
            What's this all about?
          </label>
        </div>
        <div
          className={`${
            taskName !== "" ? "flex" : "hidden"
          } mb-3 flex-col-reverse rounded-xl border-t-2 bg-zinc-900`}
        >
          <input
            className="mb-2 w-4/5 self-center text-center"
            type="text"
            name="owner"
            id="owner"
            title="owner"
            onChange={onOwnerChangeHandler}
          />
          <label
            className="mb-2 text-xl font-semibold text-slate-300"
            htmlFor="owner"
          >
            Who is taking care of it?
          </label>
        </div>
        <div
          className={`${
            owner !== "" ? "flex" : "hidden"
          } mb-3 flex-col-reverse rounded-xl border-t-2 bg-zinc-900`}
        >
          <input
            className="mb-2 h-10 w-4/5 self-center"
            type="datetime-local"
            name="deadline"
            id="deadline"
            title="deadline"
            onChange={onDeadLineChangeHandler}
          />
          <label
            className="mb-2 text-xl font-semibold text-slate-300"
            htmlFor="deadline"
          >
            Set deadline here
          </label>
        </div>
        <div className={`${deadLine !== "" ? "" : "hidden"}`}>
          <div
            className={`${
              deadLine !== "" ? "flex" : "hidden"
            } mb-1 flex-col-reverse rounded-xl border-t-2 bg-zinc-900`}
          >
            <input
              className="w-11/12 self-center"
              type="range"
              name="priority"
              id="priority"
              title="priority"
              onChange={onRangeChangeHandler}
            />
            <label
              className="mb-2 text-xl font-semibold text-slate-300"
              htmlFor="priority"
            >
              Is it that important?
            </label>
          </div>
          <h2
            className={`${priorityMarkerColor(
              priority
            )} mb-2 text-4xl font-semibold`}
          >
            {priorityMarkerString}
          </h2>
          <button type="submit" className="text-slate-200 bg-slate-800 border-fuchsia-200 rounded p-1 mb-2 border">Add a Task</button>
        </div>
      </form>
    </div>
  );
};
