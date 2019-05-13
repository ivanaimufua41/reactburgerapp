import React, { Component } from 'react';
import Aux from '../../../hoc/commonWrapper';
import Button from '../../UIElements/Button/Button';

class orderSummary extends Component{
  render() {
      const ingredientSummary = Object.keys(this.props.ingredients)
        .map(key => {
            return <li key={key}><span
              style={{ textTransform: 'capitalize'}}>{key}</span>: {this.props.ingredients[key]}</li>
            })
  return (
    <Aux>
        <h3>Your Order</h3>
        <p>A burger made with the following:</p>
        <ul>
          {ingredientSummary} 
        </ul>
        <p><strong>total Price:$ {this.props.price.toFixed(2)}</strong></p>
        <p>Checkout?</p>
        <Button btnType="Danger"
          clicked={this.props.purchaseCancelled}
          >CANCEL</Button>
        <Button btnType="Success"
          clicked={this.props.purchaseContinue}
          >CONTINUE</Button>
      </Aux>
    )}
}

export default orderSummary;
