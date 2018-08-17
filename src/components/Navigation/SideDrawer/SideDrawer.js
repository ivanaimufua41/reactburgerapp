import React from 'react';
import Logo from '../../Logo/Logo';
import NavItems from '../NavigationItems/NavItems';
import Backdrop from '../../UIElements/Backdrop/Backdrop';
import Aux from '../../../hoc/aex';

import classes from './SideDrawer.css'


const sideDrawer = (props) => {
  let attachedClasses = [classes.SideDrawer, classes.Close];
  if(props.open){
    attachedClasses = [classes.SideDrawer, classes.Open];
  }

  return(
    <Aux>
      <Backdrop show={props.open} clicked={props.closed}/>
      <div className={attachedClasses.join(' ')}>
        <div className={classes.Logo}>
            <Logo />
        </div>
        <nav>
          <NavItems />
        </nav>
      </div>
    </Aux>
  )
};

export default sideDrawer;
