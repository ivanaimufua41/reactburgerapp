import React from 'react';
import classes from './navItem.css'

const navItem = (props) =>{
  return(
    <li className={classes.NavigationItem}>
      <a href={props.link}
        className={props.active ? classes.active: null}
        >{props.children}</a>
    </li>
  )
};

export default navItem;
