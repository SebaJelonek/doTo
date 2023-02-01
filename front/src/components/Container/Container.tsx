import React, { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { marginLeftAtom } from '../../Atoms';

import CheckList from '../../Pages/CheckList/CheckList';
import SharedList from '../../Pages/SharedList/SharedList';
import ShoppingList from '../../Pages/ShoppingList/ShoppingList';

const Container: React.FC = () => {
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const [marginLeft] = useAtom(marginLeftAtom);
  useEffect(() => {
    setHeight(window.screen.height);
    setWidth(window.screen.width);
  });

  return (
    <div className='flex overflow-x-hidden' style={{ marginLeft }}>
      <ShoppingList height={height} width={width} />
      <CheckList height={height} width={width} />
      <SharedList height={height} width={width} />
    </div>
  );
};

export default Container;
