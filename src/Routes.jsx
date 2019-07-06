import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

//import OrderList from './components/AllOrders/OrderList';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';

class Routes extends Component {
    render() {
        return (
            <Switch>
                {/*<Route path="/orders" Component={OrderList} />*/}
                <Route path="/" Component={BurgerBuilder} />
            </Switch>)
    }
}

export default Routes;