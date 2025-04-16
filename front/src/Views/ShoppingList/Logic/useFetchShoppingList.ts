import { useEffect } from 'react';
import { useFetch } from '../../../Fetch';
import { useAtom } from 'jotai';
import {
  BACKEND_ATOM,
  sheetEmptyAtom,
  SheetIDAtom,
  shoppingListAtom,
} from '../../../Atoms';

export const useFetchShoppingList = () => {
  const [sheetId] = useAtom(SheetIDAtom);
  const [BACKEND] = useAtom(BACKEND_ATOM);
  const [, setShoppingList] = useAtom(shoppingListAtom);
  const [, setSheetEmpty] = useAtom(sheetEmptyAtom);
  const response = useFetch('GET', `${BACKEND}/api/sheet/${sheetId}`);

  useEffect(() => {
    try {
      if (response !== undefined)
        response.then(({ status, message, items }) => {
          if (status === 200 && items.length > 0) {
            setShoppingList(items);
            setSheetEmpty(false);
          } else {
            setSheetEmpty(true);
          }
        });
    } catch (error) {
      console.log(error);
    }
  }, []);
};
