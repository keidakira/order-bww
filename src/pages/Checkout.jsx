import React, { useContext } from "react";
import { CartContext } from "../App";

import "./Checkout.css";

const Checkout = () => {
  const [cart, ...rest] = useContext(CartContext);

  return (
    <div className="checkout-page">
      <div className="checkout-item cart-content">
        <p className="title">Your Cart</p>
        <div className="cart-items">
          {cart.items.map(({ item, quantity }, index) => {
            return (
              <div className="cart-item" key={index}>
                <img src={item.image} alt="item" />
                <div className="item-details">
                  <span className="name text-bold">{item.title}</span>
                  <span className="quantity">Quantity: {quantity}</span>
                </div>
                <span className="price">$ {item.price}</span>
              </div>
            );
          })}
        </div>
        <div className="total-price">
          <span className="text-bold">Total Price:</span>
          <span className="price">$ {cart.total}</span>
        </div>
      </div>
      <div className="checkout-item payment-content">
        Here goes your payment page!
      </div>
    </div>
  );
};

export default Checkout;
