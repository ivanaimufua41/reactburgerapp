import React, { Component } from 'react';
import CommonWrapper from '../../../hoc/commonWrapper';
import Button from '../../UIElements/Button/Button';

class orderSummary extends Component{
  constructor(props) {
    super(props);
    this.state = {
      ingredientSummary: []
    }
  }

  componentDidMount() {
    if (this.props.ingredients !== null) {
      const ingredientSummary = Object.keys(this.props.ingredients)
      .map(key => {
          return <li key={key}><span
            style={{ textTransform: 'capitalize'}}>{key}</span>: {this.props.ingredients[key]}</li>
          });

          this.setState({ ingredientSummary });
    }
  }
  render() {
   return (
    <CommonWrapper>
        <h3>Your Order</h3>
        <p>A burger made with the following:</p>
        <ul>
          {this.state.ingredientSummary} 
        </ul>
        <p><strong>total Price:$ {this.props.price.toFixed(2)}</strong></p>
        <p>Checkout?</p>
        <Button btnType="Danger"
          clicked={this.props.purchaseCancelled}
          >CANCEL</Button>
        <Button btnType="Success"
          clicked={this.props.purchaseContinue}
          >CONTINUE</Button>
      </CommonWrapper>
    )}
}

export default orderSummary;
