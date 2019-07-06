import React from 'react';
import BurgerAPI from '../../containers/BurgerBuilder/BurgerApi';

const orderList = () => {
  const [isLoading, setLoading] = React.useState(true);
  const [orders, setOrders] = React.useState([]);
  React.useEffect(() => BurgerAPI.getBurgerOrders().then(burgers => setOrders(burgers), setLoading(false)), [])
  return (
    <div>
      {isLoading ? <div>Loading</div> : orders}
    </div>
  )
};

export default orderList;