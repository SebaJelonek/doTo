import React, { useEffect, useMemo } from "react";
import { useAtom } from "jotai";
import InputField from "../../components/Form/InputField";
import ShoppingListContainer from "./Layout/ShoppingListContainer/ShoppingListContainer";
import {
  AuthTokenAtom,
  BACKEND_ATOM,
  heightAtom,
  shoppingListAtom,
  UserAtom,
  widthAtom,
} from "../../Atoms";
import { useFetchShoppingList } from "./Logic/useFetchShoppingList";
import { submitItem } from "./Logic/submitShoppingItem";
import { useFetch } from "../../Fetch";

const ShoppingList: React.FC = () => {
  const [BACKEND] = useAtom(BACKEND_ATOM);
  const [authToken] = useAtom(AuthTokenAtom);
  const [shoppingList, setShoppingList] = useAtom(shoppingListAtom);
  const [width] = useAtom(widthAtom);
  const [height] = useAtom(heightAtom);
  const [user] = useAtom(UserAtom);

  // useFetchShoppingList();
  // const url = useMemo(() => `${BACKEND}/api/items`, [BACKEND]);

  useEffect(() => {
    console.log("render");

    const response = useFetch("GET", `${BACKEND}/api/items`);
    try {
      if (response !== undefined)
        response.then((res: any) => {
          if (res[1] === 200) {
            console.log("items ", res[0]);
            res[0].then((value: any) => {
              console.log("value if", value);
              setShoppingList(value);
              console.log("shopping list state", shoppingList);
            });
          } else {
            console.log("no nic");
          }
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const onSubmitHandler = (inputValue: string) => {
    submitItem(inputValue, BACKEND, setShoppingList);
  };

  return (
    <div
      className="p-8 pb-0 pt-7"
      style={{ minHeight: height - 60, minWidth: width }}
    >
      {shoppingList.length > 0 ? (
        <div>
          <InputField
            name="Item name"
            type="text"
            onSubmitHandler={onSubmitHandler}
          />
          <ShoppingListContainer list={shoppingList} />
        </div>
      ) : (
        <div>
          <h2 className="mb-4 text-4xl text-amber-300">
            Shopping list is empty
          </h2>
          <h2 className="mb-8 text-3xl text-amber-300">Add new item below</h2>
          <InputField
            name="Item name"
            type="text"
            onSubmitHandler={onSubmitHandler}
          />
        </div>
      )}
    </div>
  );
};

export default ShoppingList;
