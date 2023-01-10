import React, { Fragment, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// ------------ NAVBAR ------------ \\
import Navbar from '../../components/Navigation/Navbar/Navbar';
// ------------ PAGES ------------ \\
import Index from '../../Pages/Index/Index';
import ShoppingList from '../../Pages/ShoppingList/ShoppingList';
import CheckList from '../../Pages/CheckList/CheckList';
import SharedList from '../../Pages/SharedList/SharedList';

const Navigation: React.FC = () => {
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const windowHeight = () => {
      setHeight(window.screen.height);
    };
    windowHeight();
  }, []);

  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Index />} />
          <Route
            path='/shopping-list'
            element={<ShoppingList height={height} />}
          />
          <Route path='/check-list' element={<CheckList height={height} />} />
          <Route path='/shared-list' element={<SharedList height={height} />} />
        </Routes>
        <Navbar />
      </Router>
    </div>
  );
};

export default Navigation;
