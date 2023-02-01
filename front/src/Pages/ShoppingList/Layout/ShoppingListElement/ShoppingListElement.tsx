import React, { useEffect, useState } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';

interface Props {
  id: string | null;
  item: string | null;
  deleteShoppingItem: (id: string) => void;
}

const ShoppingListElement: React.FC<Props> = ({
  id,
  item,
  deleteShoppingItem,
}) => {
  const [currentOffset, setCurrentOffset] = useState(0);
  const [deleted, setDeleted] = useState(false);
  const [gone, setGone] = useState(false);

  const [{ x }, api] = useSpring(() => ({
    x: 0,
  }));

  const { height } = useSpring({
    height: deleted ? 0 : 80,
    config: { duration: 256 },
  });

  const { marginBottom } = useSpring({
    marginBottom: deleted ? 0 : 16,
    config: { duration: 64 },
  });

  const { x: end } = useSpring({
    x: gone ? -645 : 0,
    config: { duration: 1260 },
  });

  let red = 70 + currentOffset * -1.5;

  useEffect(() => {
    currentOffset <= -180 && setGone(true);
  }, [currentOffset]);

  useEffect(() => {
    setTimeout(() => {
      gone && setDeleted(true);
    }, 600);
  }, [gone]);

  useEffect(() => {
    if (deleted) {
      setTimeout(() => {
        id !== null && deleteShoppingItem(id);
      }, 900);
    }
  }, [deleted]);

  // Set the drag hook and define component movement based on gesture data
  const bind = useDrag(({ active, movement: [mx] }) => {
    setCurrentOffset(mx);
    api.start({ x: active ? mx : 0, immediate: active });
  });

  // Bind it to a component
  return (
    <animated.div
      style={{
        x: gone ? end : 0,
        height,
        marginBottom,
        backgroundColor: `rgb(${red} 25 25)`,
      }}
      className={`h-16 w-64 rounded-2xl`}
    >
      <div>
        <div>
          <animated.div
            className='relative z-10 flex h-20 w-64 items-center justify-center rounded-2xl bg-slate-200'
            {...bind()}
            style={{ x, height, touchAction: 'none' }}
          >
            <animated.h3
              className='z-20 touch-none select-none p-1 text-lg text-cyan-600'
              {...bind()}
            >
              {item}
            </animated.h3>
          </animated.div>
        </div>
      </div>

      <animated.h3
        className='relative bottom-11 select-none pr-3 text-right text-2xl text-cyan-200'
        style={{ x: gone ? end : 0 }}
      >
        Delete
      </animated.h3>
    </animated.div>
  );
};

export default ShoppingListElement;
