import { useFetch } from '../../../Fetch';

interface SubmitFunctionInterface {
  submitFunction: (
    inputValue: string,
    sheetId: string,
    BACKEND: string,
    setShoppingList: (update: any) => void
  ) => void;
}

export const submitItem: SubmitFunctionInterface['submitFunction'] = (
  inputValue,
  sheetId,
  BACKEND,
  setShoppingList
) => {
  const newItem = { item: inputValue, sheetId };

  const response = useFetch('POST', `${BACKEND}/api/task/new`, newItem);
  response?.then(({ status, _id }) => {
    if (status === 200) {
      setShoppingList((prevState: (typeof newItem)[]) => [
        ...prevState,
        { id: _id.toString(), item: inputValue },
      ]);
    }
  });
};
