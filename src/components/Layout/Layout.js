import React,{ Component } from 'react';
import classes from './Layout.css';

import Aux from '../../hoc/aex';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
	state = {
		showSideDrawer:true
	}

	sideDrawerCloseHandler = () =>{
		this.setState({showSideDrawer:false});
	}

	drawerToggleClickedHandler = () => {
		this.setState( ( prevState ) => {
			return { showSideDrawer: !prevState.showSideDrawer};
		} );
	}

	render(){
		return(
			<Aux>
				<Toolbar toggleClicked={this.drawerToggleClickedHandler} />
					<SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerCloseHandler}/>
					<main className={classes.Content}>
						{this.props.children}
					</main>
				</Aux>
	)}
}
;

export default Layout;
