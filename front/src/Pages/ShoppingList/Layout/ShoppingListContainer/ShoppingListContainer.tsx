import React from 'react';
import { useTransition, animated } from '@react-spring/web';
import { useAtom } from 'jotai';
import { BACKEND_ATOM, shoppingListAtom } from '../../../../Atoms';
import ShoppingListElement from '../ShoppingListElement/ShoppingListElement';
import { deleteShoppingItem as deleteShoppingItemFunction } from '../../Logic/deleteShoppingItem';

interface Props {
  list: {
    id: string;
    item: string;
  }[];
}

const sheetId = '63610d3bca983db268d6c2bf';

const ShoppingListContainer: React.FC<Props> = ({ list }) => {
  const [shoppingList, setShoppingList] = useAtom(shoppingListAtom);
  const [BACKEND] = useAtom(BACKEND_ATOM);

  // useEffect(() => {
  //   setShoppingList(list);
  //   console.log('list ');
  //   console.log(list);
  //   console.log(list[0].item);

  //   console.log('shoppingList ');
  //   console.log(shoppingList);

  //   console.log('what does it do?');
  // });

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
