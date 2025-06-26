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
  response?.then((res:any) => {
    if (res.status === 200) {
      setShoppingList((prevState: (typeof newItem)[]) => [
        ...prevState,
        { id: res._id.toString(), item },
      ]);
    }
  });
};
