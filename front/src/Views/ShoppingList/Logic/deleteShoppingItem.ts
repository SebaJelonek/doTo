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
  (itemId, taskList, setTaskList, BACKEND, sheetId) => {
    console.log(itemId);
    console.log(sheetId);

    if (taskList.length === 1) {
      setTaskList((prevState: typeof taskList) =>
        prevState.filter(({ id }) => itemId !== id)
      );
    } else {
      setTaskList((prevState: typeof taskList) =>
        prevState.filter(({ id }) => itemId !== id)
      );
    }
    const response = useFetch('POST', `${BACKEND}/api/item/delete`, {
      _id: sheetId,
      itemId,
    });
    response?.then((res) => {
      console.log(res);
    });
  };
