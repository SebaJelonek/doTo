import React, { useEffect, useState, useRef } from "react";


interface Props {
  onSubmit: (
    taskName: string,
    owner: string,
    deadLine: number,
    priority: string
  ) => void;
}
const validKeys = ["Enter", "Tab", "Done", "Go", "Next"];
export const MultInput: React.FC<Props> = ({ onSubmit }) => {
  const [taskName, setTaskName] = useState("");
  const [owner, setOwner] = useState("");
  const [deadLine, setDeadLine] = useState("");
  const [priority, setPriority] = useState("50");
  const ownerRef = useRef<HTMLInputElement>(null)
  const deadlineRef = useRef<HTMLInputElement>(null)
  const [priorityMarkerString, setPriorityMarkerString] = useState("")
  const [taskNameEnterPressed, setTaskNameEnterPressed] = useState(false)
  const [ownerEnterPressed, setOwnerEnterPressed] = useState(false)
  const [deadlineIsChanged, setDeadlineIsChanged] = useState(false)
  const [priorityIsChanged, setPriorityIsChanged] = useState(false)
  
  useEffect(() => {
    if (taskNameEnterPressed && ownerRef.current) ownerRef.current.focus();
    if (ownerEnterPressed && deadlineRef.current) deadlineRef.current.focus();

  }, [taskNameEnterPressed, ownerEnterPressed]);
  
  
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
    setTaskNameEnterPressed(false)
    setOwnerEnterPressed(false)
    setDeadlineIsChanged(false)
    setPriorityIsChanged(false)
  }

  function onEnterDownTask(e:React.KeyboardEvent<HTMLInputElement>) 
    { 
      if (validKeys.includes(e.key))
        {
          e.preventDefault()
          setTaskNameEnterPressed(true)
        }
    }
  function onEnterDownOwner(e:React.KeyboardEvent<HTMLInputElement>) 
    {
      if (validKeys.includes(e.key))
        {
          e.preventDefault()
          setOwnerEnterPressed(true)
        }
    }
  

  function onNameChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault()
    setTaskName(e.currentTarget.value);
  }
  function onOwnerChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setOwner(e.currentTarget.value);
  }
  function onDeadLineChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setDeadLine(e.currentTarget.value);
    setDeadlineIsChanged(true)
  }

  function onRangeChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setPriority(e.currentTarget.value);
    setPriorityIsChanged(true)
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
        <div className={`${taskNameEnterPressed === false ? "flex" : "hidden"} mb-3 flex-col-reverse rounded-xl border-t-2 bg-zinc-900`}>
          <input
            value={taskName}
            className="mb-2 w-4/5 self-center text-center"
            type="text"
            name="taskName"
            id="taskName"
            title="taskName"
            onChange={onNameChangeHandler}
            onKeyDown={onEnterDownTask}
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
            taskNameEnterPressed === true && ownerEnterPressed === false ? "flex" : "hidden"
          } mb-3 flex-col-reverse rounded-xl border-t-2 bg-zinc-900`}
        >
          <input
            ref={ownerRef}                   
            value={owner}
            className="mb-2 w-4/5 self-center text-center"
            type="text"
            name="owner"
            id="owner"
            title="owner"
            onChange={onOwnerChangeHandler}
            onKeyDown={onEnterDownOwner}
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
            ownerEnterPressed === true && deadlineIsChanged === false ? "flex" : "hidden"
          } mb-3 flex-col-reverse rounded-xl border-t-2 bg-zinc-900`}
        >          
          <input
            ref={deadlineRef}
            value={deadLine}
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
        <div className={`${deadlineIsChanged === true ? "" : "hidden"}`}>
          <div
            className={`${deadlineIsChanged === true ? "flex" : "hidden"}
            mb-1 flex-col-reverse rounded-xl border-t-2 bg-zinc-900`}
          >
            <input            
              value={priority}
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
          <button className={`${priorityIsChanged === true ? "inline-block" : "hidden"} text-slate-200 bg-slate-800 border-fuchsia-200 rounded p-1 mb-2 border`}>Add a Task</button>
        </div>
      </form>
    </div>
  );
};
