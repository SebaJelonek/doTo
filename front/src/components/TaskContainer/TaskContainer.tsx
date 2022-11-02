import React, { useEffect } from 'react';
import { useAtom } from 'jotai';
import { BACKEND_ATOM, taskListAtom } from '../../Atoms';
import { useTransition, animated } from '@react-spring/web';
import TaskElement from '../TaskElement/TaskElement';
import useFetch from '../../Fetch';

interface Props {
  list: {
    id: string;
    task: string;
  }[];
}

const sheetId = '63610d3bca983db268d6c2bf';

const TaskContainer: React.FC<Props> = ({ list }) => {
  const [taskList, setTaskList] = useAtom(taskListAtom);
  const [BACKEND] = useAtom(BACKEND_ATOM);

  useEffect(() => {
    setTaskList(list);
  });

  const transitions = useTransition(taskList, {
    from: { top: -10000 },
    enter: { top: 0 },
    leave: {},
  });

  const deleteTask = (taskId: string) => {
    if (taskList.length === 1) {
      setTaskList((prevState) => prevState.filter(({ id }) => taskId !== id));
    } else {
      setTaskList((prevState) => prevState.filter(({ id }) => taskId !== id));
    }
    const response = useFetch('POST', `${BACKEND}/api/task/delete`, {
      _id: sheetId,
      taskId,
    });
    response?.then((res) => {
      console.log(res);
    });
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

export default TaskContainer;
