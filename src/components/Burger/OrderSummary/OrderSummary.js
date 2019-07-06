import React from 'react';
import Button from '../../UIElements/Button/Button';

const orderSummary = props => {
  const convertedIngredients = convertIngredients(props.ingredients);
  const burgerOrderSummary = createBurgerOrderSummary(convertedIngredients, props);
  return burgerOrderSummary;
}

const createBurgerOrderSummary = (ingredients, props) => {
  return (
    <React.Fragment>
      <h3> Your Order</h3 >
      <p>A burger made with the following:</p>
      <ul>
        {ingredients}
      </ul>
      <p><strong>Total Price:$ {props.price.toFixed(2)}</strong></p>
      <p>Checkout?</p>
      <Button btnType="Danger" clicked={props.purchaseCancelled}>CANCEL</Button>
      <Button btnType="Success" clicked={props.purchaseContinue}>CONTINUE</Button>
    </React.Fragment>
  )
}

const convertIngredients = (ingredients) => {
  return ingredients !== null && ingredients !== undefined ?
  Object.keys(ingredients).map(key => <li key={key}><span style={{ textTransform: 'capitalize' }}>{key}</span>
    :{ingredients[key]}
  </li>) : [];
}

export default orderSummary;
