import React, { useEffect } from 'react';
import { useAtom } from 'jotai';
import InputField from '../../components/Form/Form';
import ShoppingListContainer from './Layout/ShoppingListContainer/ShoppingListContainer';
import {
  BACKEND_ATOM,
  heightAtom,
  sheetEmptyAtom,
  SheetIDAtom,
  shoppingListAtom,
  widthAtom,
} from '../../Atoms';
import { useFetchShoppingList } from './Logic/useFetchShoppingList';
import { submitItem } from './Logic/submitShoppingItem';

const ShoppingList: React.FC = () => {
  const [BACKEND] = useAtom(BACKEND_ATOM);
  const [sheetId] = useAtom(SheetIDAtom);
  const [shoppingList, setShoppingList] = useAtom(shoppingListAtom);
  const [sheetEmpty] = useAtom(sheetEmptyAtom);
  const [width] = useAtom(widthAtom);
  const [height] = useAtom(heightAtom);

  useFetchShoppingList();

  const onSubmitHandler = (inputValue: string) =>
    submitItem(inputValue, sheetId, BACKEND, setShoppingList);

  return (
    <div
      className='p-8 pt-7 pb-0'
      style={{ minHeight: height - 60, minWidth: width }}
    >
      {!sheetEmpty ? (
        <div key={sheetId}>
          <InputField
            name='Item name'
            type='text'
            onSubmitHandler={onSubmitHandler}
          />
          <ShoppingListContainer list={shoppingList} />
        </div>
      ) : (
        <div>
          <h2 className='mb-4 text-4xl text-amber-300'>
            Shopping list is empty
          </h2>
          <h2 className='mb-8 text-3xl text-amber-300'>Add new item below</h2>
          <InputField
            name='Item name'
            type='text'
            onSubmitHandler={onSubmitHandler}
          />
        </div>
      )}
    </div>
  );
};

export default ShoppingList;
