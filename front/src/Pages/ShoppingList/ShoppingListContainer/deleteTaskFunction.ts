import useFetch from '../../../Fetch';

interface Arguments {
  deleteFunction: (
    taskId: string,
    taskList: {
      id: string;
      task: string;
    }[],
    setTaskList: (update: any) => void,
    BACKEND: string,
    sheetId: string
  ) => void;
}

const deleteTask: Arguments['deleteFunction'] = (
  taskId,
  taskList,
  setTaskList,
  BACKEND,
  sheetId
) => {
  if (taskList.length === 1) {
    setTaskList((prevState: typeof taskList) =>
      prevState.filter(({ id }) => taskId !== id)
    );
  } else {
    setTaskList((prevState: typeof taskList) =>
      prevState.filter(({ id }) => taskId !== id)
    );
  }
  const response = useFetch('POST', `${BACKEND}/api/task/delete`, {
    _id: sheetId,
    taskId,
  });
  response?.then((res) => {
    console.log(res);
  });
};

export default deleteTask;
