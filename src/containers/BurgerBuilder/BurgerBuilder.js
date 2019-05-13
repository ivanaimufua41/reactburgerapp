import React, { Component } from "react";
import Aux from "../../hoc/aex";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UIElements/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UIElements/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import axios from "../../axios-order";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.7,
  bacon: 0.7
};

const orderURL = "https://burgerapp-react-58cc7.firebaseio.com/ingredients.json";

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
    axios
      .get(orderURL)
      .then(response => {
        this.setState({ ingredients: response.data });
      })
      .catch(err => {
        this.setState({ error: true });
      });
  }

  updatePurchase = ingredients => {
    const sum = Object.keys(ingredients)
      .map(key => {
        return ingredients[key];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
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
    const order = {
      Ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: this.state.customer
    };
    axios
      .post("/orders.json", order)
      .then(response => {
        this.setState({ loading: false, purchasing: false });
      })
      .catch(err => {
        this.setState({ loading: false, purchasing: false });
      });
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
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceSub = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceSub;
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updatePurchase(updatedIngredients);
  };

  setOrderSummary = () => {
    let orderSummary = null;

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    orderSummary = (
      <OrderSummary
        ingredients={this.state.ingredients}
        purchaseCancelled={this.modalClosedHandler}
        purchaseContinue={this.purchaseContinueHandler}
        price={this.state.totalPrice}
      />
    );

    return orderSummary;
  }

  setDisabledInfo = () => {
    const disabledInfo = {
      ...this.state.ingredients
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    return disabledInfo;
  }

  setBurger = () => {
    let burger = this.state.error ? (
      <p>Ingredients cant be loaded fam</p>
      ) : (
        <Spinner />
      );

      const disabledInfo = this.setDisabledInfo();
    
      if (this.state.ingredients) {
        burger = (
          <Aux>
            <Burger ingredients={this.state.ingredients} />
            <BuildControls
              addIngredient={this.addIngredientHandler}
              subIngredient={this.removeIngredientHandler}
              disabled={disabledInfo}
              price={this.state.totalPrice}
              purchase={this.state.purchasable}
              ordered={this.purchaseHandler}
            />
          </Aux>
        );
      }
      return burger;
    
  }

render() {
  const orderSummary = this.setOrderSummary();
  const burder = this.setBurger();

  return (
    <Aux>
      <Modal
        show={this.state.purchasing}
        modalClosed={this.modalClosedHandler}
      >
        {orderSummary}
      </Modal>
      {burger}
    </Aux>
  );
}
}

export default withErrorHandler(burgerBuilder, axios);
