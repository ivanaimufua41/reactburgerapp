import React,{ Component } from 'react';
import classes from './Layout.css';

import CommonWrapper from '../../hoc/commonWrapper';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
	state = {
		showSideDrawer:true
	}

	sideDrawerCloseHandler = () =>{
		this.setState({ showSideDrawer: false });
	}

	drawerToggleClickedHandler = () => {
		const updatedState =  {...this.state};
		updatedState.showSideDrawer = !updatedState.showSideDrawer;
		this.setState(updatedState);
	}

	openCheckOutForm = () => {
		// call function to open/navigate to checkout form
		// build checkout form take an order object which has all the fields we want to post
	}

	render(){
		return(
			<CommonWrapper>
				<Toolbar toggleClicked={this.drawerToggleClickedHandler} />
					<SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerCloseHandler}/>
					<main className={classes.Content}>
						{this.props.children}
					</main>
				</CommonWrapper>
	)}
}
;

export default Layout;
