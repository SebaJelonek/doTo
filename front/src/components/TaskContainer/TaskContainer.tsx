import React, { useEffect } from 'react';
import { useAtom } from 'jotai';
import { taskListAtom } from '../../Atoms';
import { useTransition, animated } from '@react-spring/web';
import TaskElement from '../TaskElement/TaskElement';

const Container: React.FC = () => {
  const [taskList, setTaskList] = useAtom(taskListAtom);

  useEffect(() => {
    // console.log(window.localStorage.getItem('taskList')?.split(','));
    // console.log(window.localStorage.getItem('idsList')?.split(','));
  });

  const transitions = useTransition(taskList, {
    from: { top: -10000 },
    enter: { top: 0 },
    leave: {},
  });

  const deleteTask = (taskId: string) => {
    setTaskList((prevState) => prevState.filter(({ id }) => taskId !== id));
  };

  return (
    <div>
      {transitions((styles, { id, task }) => (
        <animated.div style={{ ...styles, position: 'relative' }} key={id}>
          <TaskElement task={task} id={id} deleteTask={deleteTask} />
        </animated.div>
      ))}
    </div>
  );
};

export default Container;
