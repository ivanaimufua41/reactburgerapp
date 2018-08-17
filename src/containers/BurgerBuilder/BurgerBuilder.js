import React, { Component } from 'react';
import Aux from '../../hoc/aex';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UIElements/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
const INGREDIENT_PRICES = {
	salad:.5,
	cheese:.4,
	meat:1.7,
	bacon:0.7
};


class burgerBuilder extends Component {
	state = {
		ingredients:{
			salad:0,
			cheese:0,
			bacon:0,
			meat:0
		},
		totalPrice: 3,
		purchasable: false,
		purchasing:false
	}

	updatePurchase = (ingredients) => {
		const sum = Object.keys(ingredients)
			.map(key => {
				return ingredients[key];
			})
			.reduce((sum, el) => {
				return sum + el;
			}, 0);
		this.setState({purchasable:sum > 0});
	}
	purchaseHandler = () => {
		this.setState({purchasing:true})
	}

	modalClosedHandler = () => {
		this.setState({purchasing:false})
	}

	purchaseContinueHandler = () => {
		alert("You continue!");
	}

	addIngredientHandler = (type) => {
		const oldCount = this.state.ingredients[type];
		const updatedCount = oldCount + 1;
		const updatedIngredients = {
			...this.state.ingredients
		};
		updatedIngredients[type] = updatedCount;
		const priceAdd = INGREDIENT_PRICES[type];
		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice + priceAdd;
		this.setState({totalPrice:newPrice, ingredients:updatedIngredients})
		this.updatePurchase(updatedIngredients);
	}

	removeIngredientHandler =(type) => {
		const oldCount = this.state.ingredients[type];
		if(oldCount <=0){
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
		this.setState({totalPrice:newPrice, ingredients:updatedIngredients})
		this.updatePurchase(updatedIngredients);
	}

	render(){
		const disabledInfo = {
			...this.state.ingredients
		};
		for(let key in disabledInfo){
			disabledInfo[key] = disabledInfo[key] <= 0
		}
		return(
			<Aux>
				<Modal show={this.state.purchasing}
					modalClosed={this.modalClosedHandler}>
					<OrderSummary ingredients={this.state.ingredients}
					purchaseCancelled={this.modalClosedHandler}
					purchaseContinue={this.purchaseContinueHandler}
					price={this.state.totalPrice} />
				</Modal>
				<Burger ingredients={this.state.ingredients}/>
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
}

export default burgerBuilder;
