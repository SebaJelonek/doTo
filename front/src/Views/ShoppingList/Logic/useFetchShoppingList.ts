import { useEffect, useMemo } from 'react';
import { useFetch } from '../../../Fetch';
import { useAtom } from 'jotai';
import {
  BACKEND_ATOM,
  shoppingListAtom,
} from '../../../Atoms';

export const useFetchShoppingList = () => {

  const [BACKEND] = useAtom(BACKEND_ATOM);
  const [shoppingList, setShoppingList] = useAtom(shoppingListAtom);

  const url = useMemo(() => `${BACKEND}/api/items`, [BACKEND]);

  const response = useFetch('GET', url);

  useEffect(() => {
    try {
      console.log(response !== undefined);
      
      if (response !== undefined)
        response.then((res: any) => {
          if (res.status === 200 && res.items.length > 0) {
           setShoppingList(res.items);
          } else {
            console.log("no nic");
          }
        });
    } catch (error) {
      console.log(error);
    }
  }, []);
};
