import React, { Component } from 'react';
import Button from '../../UIElements/Button/Button';

class orderSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredientSummary: []
    }
  }

  componentDidMount() {
    const { ingredients } = this.props;
    if (ingredients !== null) {
      const ingredientSummary =
        Object.keys(ingredients).map(key => <li key={key}><span style={{ textTransform: 'capitalize' }}>{key}</span>: {this.props.ingredients[key]}</li>);
      this.setState({ ingredientSummary });
    }

  }

  burgerOrderSummary = () => {
    const { purchaseCancelled, purchaseContinue, price } = this.props;
    const { ingredientSummary } = this.state;
    return (
      <React.Fragment>
        <h3> Your Order</h3 >
        <p>A burger made with the following:</p>
        <ul>
          {ingredientSummary}
        </ul>
        <p><strong>Total Price:$ {price.toFixed(2)}</strong></p>
        <p>Checkout?</p>
        <Button btnType="Danger" clicked={purchaseCancelled}>CANCEL</Button>
        <Button btnType="Success" clicked={purchaseContinue}>CONTINUE</Button>
      </React.Fragment>
    )
  }

  render() {
    const burgerOrderSummary = this.burgerOrderSummary();
    //TODO: Convert into a presentational component
    return (
      { burgerOrderSummary }
    )
  }
}

export default orderSummary;
