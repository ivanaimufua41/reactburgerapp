import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredients';


const burger = (props) => {
	let transformedIngredients = Object.keys(props.ingredients)
		.map(igKey => {
			console.log(igKey);
			return [...Array(props.ingredients[igKey])].map((_, i) =>{
				console.log(i);
				return <BurgerIngredient key={igKey + i} type={igKey} />
			}); //an array with 2 elements
		})
		.reduce((arr, el) =>{
			return arr.concat(el);
		}, [])
		if(transformedIngredients.length === 0){
			transformedIngredients = <p>Start adding Ingredients</p>
		};

	return(
		<div className={classes.Burger}>
			<BurgerIngredient type="bread-top" />
			{transformedIngredients}
			<BurgerIngredient type='bread-bottom' />
		</div>

		);
};

export default burger;
