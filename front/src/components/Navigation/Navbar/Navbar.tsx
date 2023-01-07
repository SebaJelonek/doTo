import React from 'react';
import Icon from '../NavIcon/NavIcon';
import ShoppingList from '../Icons/shopping.png';
import CheckList from '../Icons/note.png';
import SharedList from '../Icons/contact-list.png';

const array = [ShoppingList, CheckList, SharedList];

const Navbar: React.FC = () => {
  return (
    <div className='sticky h-14 bottom-0 z-20 bg-neutral-600'>
      <div className='flex justify-between  w-4/5 h-full m-auto'>
        {array.map((src) => (
          <Icon src={src} />
        ))}
      </div>
    </div>
  );
};

export default Navbar;
