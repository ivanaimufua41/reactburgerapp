import React from 'react';
import classes from './buildControl.css';

const buildControl = (props) => {
  return(<div className={classes.BuildControl}>
    <div className={classes.Label}>{props.label}</div>
    <button onClick={props.subIngredient}
      className={classes.Less}
      disabled={props.disabled}>Less</button>
    <button onClick={props.addIngredient}
      className={classes.More}>More</button>
  </div>)
}

export default buildControl;
