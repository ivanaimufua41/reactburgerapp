import React from 'react';
import classes from './navItems.css';
import NavigationItem from './navItem/NavItem';

const navItems = (props) =>{
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link="/" active>
        Burger Builder
      </NavigationItem>
      <NavigationItem link="/">
        CheckOut
      </NavigationItem>
    </ul>
  )
};

export default navItems;
