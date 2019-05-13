import React from 'react';
import classes from './buildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
  {label:'Salad', type:'salad'},
  {label:'Bacon', type:'bacon'},
  {label:'Cheese', type:'cheese'},
  {label:'Meat', type:'meat'},
]

const setPriceLabel = (price) => {
  if (price === 3) {
    return `Starting Price:`;
  }

  return `Current Price:`;
}

const buildControls = (props) => {
  const priceLabel = setPriceLabel(props.price);
  return(
  <div className={classes.BuildControls}>
    <p>{priceLabel}<strong> ${props.price.toFixed(2)}</strong></p>
    {controls.map(ctrl =>(
      <BuildControl
        addIngredient={() => props.addIngredient(ctrl.type)}
        subIngredient={()=> props.subIngredient(ctrl.type)}
        key={ctrl.label}
        label={ctrl.label}
        disabled={props.disabled[ctrl.type]} />
    ))}
    <button disabled={!props.purchase}
      className={classes.OrderButton}
      onClick={props.ordered}
      >Order Now</button>
  </div>
)};

export default buildControls;
