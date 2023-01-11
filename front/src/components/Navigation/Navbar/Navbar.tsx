import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { marginLeftAtom } from '../../../Atoms';
import NavIcon from '../NavIcon/NavIcon';
import ShoppingList from '../../../assets/Icons/shopping-list.png';
import CheckList from '../../../assets/Icons/check-list.png';
import SharedList from '../../../assets/Icons/shared-list.png';

const array = [ShoppingList, CheckList, SharedList];

const Navbar: React.FC = () => {
  const [active, setActive] = useState('/src/assets/Icons/shopping-list.png');
  const [, setMarginLeft] = useAtom(marginLeftAtom);

  const currentSite = (site: string) => {
    array.filter((element, index) => {
      element === site && setMarginLeft(-window.screen.width * index);
      setActive(site);
    });
  };

  return (
    <nav className='sticky h-14 bottom-0 z-20 bg-neutral-600'>
      <div className='flex justify-between w-4/5 h-full m-auto'>
        {array.map((src) => (
          <NavIcon
            src={src}
            key={src}
            currentSite={currentSite}
            active={active}
          />
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
