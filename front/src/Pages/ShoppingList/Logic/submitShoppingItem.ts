import { useFetch } from '../../../Fetch';

interface SubmitFunctionInterface {
  submitFunction: (
    item: string,
    sheetId: string,
    BACKEND: string,
    setShoppingList: (update: any) => void
  ) => void;
}

export const submitItem: SubmitFunctionInterface['submitFunction'] = (
  item,
  sheetId,
  BACKEND,
  setShoppingList
) => {
  const newItem = { item, sheetId };

  const response = useFetch('POST', `${BACKEND}/api/item/new`, newItem);
  response?.then(({ status, _id }) => {
    if (status === 200) {
      setShoppingList((prevState: (typeof newItem)[]) => [
        ...prevState,
        { id: _id.toString(), item },
      ]);
    }
  });
};
