import React, { Component } from 'react';

import './CheckoutForm.css';

class CheckoutForm extends Component {
    state = {
        isSubmitted = false,

    };

    render(){
        <div>
            <ul>
              <li>
                <label>
                  Order: 
                </label>
              </li>
              <li>
                <label>
                  Amount:  
                </label>
              </li>
            </ul>
            <div>
                <button>Order Now</button>
                <button>Cancel</button>
            </div>
        </div>

    }
    
};

export default CheckoutForm;