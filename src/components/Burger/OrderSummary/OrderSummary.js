import React from 'react';
import Aux from '../../../hoc/aex';

const orderSummary = (props) =>{
  const ingredientSummary = Object.keys(props.ingredients)
  .map(key => {
    return <li key={key}><span style={{ textTransform: 'capitalize'}}>{key}</span>: {props.ingredients[key]}</li>
  })
  return(
  <Aux>
      <h3>Your Order</h3>
      <p>A burger made with the following:</p>
      <ul>
        {ingredientSummary}
      </ul>
      <p>Checkout?</p>
  </Aux>
)};

export default orderSummary;
