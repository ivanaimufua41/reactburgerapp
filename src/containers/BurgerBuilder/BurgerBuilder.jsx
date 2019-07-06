import React, { Component } from "react";
import CommonWrapper from "../../hoc/commonWrapper";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UIElements/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UIElements/Spinner/Spinner";

import BurgerAPI from './BurgerApi';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.7,
  bacon: 0.7
};

class burgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 3,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: null,
    customer: {
      firstName: "Ivan",
      lastName: "Aimufua",
      address: {
        street: "13525 162a ave",
        postalCode: "T6v4C3",
        city: "Edmonton",
        Province: "Alberta",
        Country: "Canada"
      },
      email: "ivanaimufua41@gmail.com",
      contactNumber: "7809950025",
      deliveryMethod: "Bike"
    }
  };

  componentDidMount() {
    BurgerAPI.getBurgerOrder()
      .then(ingredients => this.setState({ ingredients, loading: false }))
      .catch((err) => this.setState({ error: true }))
  }

  updatePurchase = ingredients => {
    const sum = Object.keys(ingredients)
      .map(key => ingredients[key])
      .reduce((sum, el) => sum + el, 0);
    this.setState({ purchasable: sum > 0 });
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  modalClosedHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    this.setState({ loading: true });
    const { ingredients, totalPrice, customer } = this.state;
    const order = {
      ingredients: ingredients,
      price: totalPrice,
      customer: customer
    };

    BurgerAPI.postBurgerOrder(order)
      .then(response => this.setState({ loading: false, purchasing: false }))
      .catch(err => this.setState({ loading: false, purchasing: false }))
  };

  addIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceAdd = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAdd;
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updatePurchase(updatedIngredients);
  };

  removeIngredientHandler = type => {
    const { ingredients, totalPrice } = this.state;
    const oldCount = ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredients = { ...ingredients };
    updatedIngredients[type] = updatedCount;
    const priceSub = INGREDIENT_PRICES[type];
    const oldPrice = totalPrice;
    const newPrice = oldPrice - priceSub;
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updatePurchase(updatedIngredients);
  };

  setOrderSummary = () => {
    const { loading, ingredients, totalPrice } = this.state;
    let orderSummary = <Spinner />;

    if (loading) {
      orderSummary = <Spinner />;
    }

    if (ingredients !== undefined) {
      orderSummary = (
        <OrderSummary
          ingredients={ingredients}
          purchaseCancelled={this.modalClosedHandler}
          purchaseContinue={this.purchaseContinueHandler}
          price={totalPrice}
        />
      );
    }

    return orderSummary;
  }

  setDisabledInfo = () => {
    const { ingredients } = this.state;
    const disabledInfo = { ingredients };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    return disabledInfo;
  }

  setBurger = () => {
    const { error, ingredients, totalPrice, purchasable } = this.state;
    let burger = error ? <p>No ingredients found</p> : <Spinner />;
    const disabledInfo = this.setDisabledInfo();
    if (ingredients) {
      burger = (
        <CommonWrapper>
          <Burger ingredients={ingredients} />
          <BuildControls
            addIngredient={this.addIngredientHandler}
            subIngredient={this.removeIngredientHandler}
            disabled={disabledInfo}
            price={totalPrice}
            purchase={purchasable}
            ordered={this.purchaseHandler}
          />
        </CommonWrapper>
      );
    }
    return burger;

  }

  render() {
    const { purchasing } = this.state;
    const orderSummary = this.setOrderSummary();
    const burger = this.setBurger();

    return (
      <CommonWrapper>
        <Modal
          show={purchasing}
          modalClosed={this.modalClosedHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </CommonWrapper>
    );
  }
}

export default burgerBuilder;
