import React from 'react';
import { useTransition, animated } from '@react-spring/web';
import { useAtom } from 'jotai';
import { BACKEND_ATOM, SheetIDAtom, shoppingListAtom } from '../../../../Atoms';
import ShoppingListElement from '../ShoppingListElement/ShoppingListElement';
import { deleteShoppingItem as deleteShoppingItemFunction } from '../../Logic/deleteShoppingItem';

interface Props {
  list: {
    id: string;
    item: string;
  }[];
}

const ShoppingListContainer: React.FC<Props> = ({ list }) => {
  const [sheetId] = useAtom(SheetIDAtom);
  const [shoppingList, setShoppingList] = useAtom(shoppingListAtom);
  const [BACKEND] = useAtom(BACKEND_ATOM);

  const transitions = useTransition(shoppingList, {
    from: { top: -10000 },
    enter: { top: 0 },
    leave: {},
  });

  const deleteShoppingItem = (taskId: string) =>
    deleteShoppingItemFunction(
      taskId,
      shoppingList,
      setShoppingList,
      BACKEND,
      sheetId
    );

  return (
    <div className='flex flex-col items-center'>
      {transitions((styles, { id, item }) => (
        <animated.div style={{ ...styles, position: 'relative' }} key={id}>
          <ShoppingListElement
            item={item}
            id={id}
            deleteShoppingItem={deleteShoppingItem}
          />
        </animated.div>
      ))}
    </div>
  );
};

export default ShoppingListContainer;
