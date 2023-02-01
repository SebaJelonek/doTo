import { useFetch } from '../../../Fetch';

interface DeleteShoppingItemInterface {
  deleteShoppingItem: (
    taskId: string,
    taskList: {
      id: string;
      item: string;
    }[],
    setTaskList: (update: any) => void,
    BACKEND: string,
    sheetId: string
  ) => void;
}

export const deleteShoppingItem: DeleteShoppingItemInterface['deleteShoppingItem'] =
  (taskId, taskList, setTaskList, BACKEND, sheetId) => {
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
