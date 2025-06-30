import { useFetch } from '../../../Fetch';

interface SubmitFunctionInterface {
  submitFunction: (
    item: string,
    BACKEND: string,
    setShoppingList: (update: any) => void
  ) => void;
}

export const submitItem: SubmitFunctionInterface['submitFunction'] = (
  item,
  BACKEND,
  setShoppingList
) => {
  const newItem = { item };

  const response = useFetch('POST', `${BACKEND}/api/item`, newItem);
  response?.then((res:any) => {
    if (res.status === 200) {
      console.log(item);
      
      setShoppingList((prevState: (typeof newItem)[]) => [
        ...prevState,
        { item },
      ]);
    }
  });
};
