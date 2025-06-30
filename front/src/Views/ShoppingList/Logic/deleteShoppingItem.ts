import { useFetch } from '../../../Fetch';

interface DeleteShoppingItemInterface {
  deleteShoppingItem: (
    taskId: string,
    taskList: {
      id: string;
      name: string;
    }[],
    setTaskList: (update: any) => void,
    BACKEND: string,
  ) => void;
}

export const deleteShoppingItem: DeleteShoppingItemInterface['deleteShoppingItem'] =
  (itemId, taskList, setTaskList, BACKEND) => {
    console.log(itemId);
    if (taskList.length === 1) {
      setTaskList((prevState: typeof taskList) =>
        prevState.filter(({ id }) => itemId !== id)
      );
    } else {
      setTaskList((prevState: typeof taskList) =>
        prevState.filter(({ id }) => itemId !== id)
      );
    }
    // const response = useFetch('DELETE', `${BACKEND}/api/items/${itemId}`); correct way
    const response = useFetch('GET', `${BACKEND}/api/delete/${itemId}`);
    response?.then((res:any) => {
      console.log(res[0]);
    });
  };
