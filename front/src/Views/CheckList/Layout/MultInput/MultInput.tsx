import React, { useState } from 'react';

export const MultInput: React.FC = () => {
    const [taskName, setTaskName] = useState("");
    const [deadLine, setDeadLine] = useState("");


    function onSubmit(e:React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

    }
    function onNameChangeHandler(e:React.ChangeEvent<HTMLInputElement>){
        setTaskName(e.currentTarget.value)
    }
    function onDeadLineChangeHandler(e:React.ChangeEvent<HTMLInputElement>) {
        setDeadLine(e.currentTarget.value)    
        console.log(deadLine);
            
    }

 return <div>
        <form onSubmit={onSubmit}>
            <input className='mb-2' type="text" onChange={onNameChangeHandler}/>
            <input className='mb-2 h-10' type="datetime-local" name="deadline" id="deadline" onChange={onDeadLineChangeHandler}/>
            
        </form>
    </div>;
};
