import React from 'react';
import { animated, useSpring } from '@react-spring/web';
import { useAtom } from 'jotai';
import { marginLeftAtom, scaleAtom } from '../../Atoms';
import CheckList from '../../Pages/CheckList/CheckList';
import SharedList from '../../Pages/SharedList/SharedList';
import ShoppingList from '../../Pages/ShoppingList/ShoppingList';

const Container: React.FC = () => {
  const [marginLeft] = useAtom(marginLeftAtom);
  // const [scale] = useAtom(scaleAtom);
  const { marginLeftOffset } = useSpring({
    marginLeftOffset: marginLeft,
  });

  // const { transform } = useSpring({
  //   transform: marginLeftOffset.get() !== 0 ? 'scale(1)' : 'scale(0.7)',
  // });

  return (
    <animated.div
      className='bg flex overflow-x-hidden'
      style={{
        marginLeft: marginLeftOffset,
        // transform,
        backgroundColor: '#0f172a',
      }}
    >
      <ShoppingList />
      <CheckList />
      <SharedList />
    </animated.div>
  );
};

export default Container;
