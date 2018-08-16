import React from 'react';
import classes from './Layout.css';

import Aux from '../../hoc/aex';

const layout = ( props ) => {
	return(
	<Aux>
		<div>TOOLBAR, 
		SIDEDRAWER, 
		BACKDROP
		</div>
			<main className={classes.Content}>
				{props.children}
			</main>
	</Aux>
	)
};

export default layout;