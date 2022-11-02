import React, { useEffect, useState } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';

interface Props {
  id: string | null;
  task: string | null;
  deleteTask: (id: string) => void;
}

const Div: React.FC<Props> = ({ id, task, deleteTask }) => {
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

  let red = currentOffset * -1.5;

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
        id !== null && deleteTask(id);
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
      className={`h-16 w-72 rounded-2xl`}
    >
      <div>
        <div>
          <animated.div
            className='bg-slate-200 h-20 w-72 rounded-2xl relative z-10 flex justify-center items-center'
            {...bind()}
            style={{ x, height, touchAction: 'none' }}
          >
            <animated.h3
              className='p-1 text-cyan-600 text-lg z-20 select-none touch-none'
              {...bind()}
            >
              {task}
            </animated.h3>
          </animated.div>
        </div>
      </div>

      <animated.h3
        className='relative bottom-11 text-cyan-200 text-2xl select-none'
        style={{ x: gone ? end : 0 }}
      >
        Delete
      </animated.h3>
    </animated.div>
  );
};

export default Div;
