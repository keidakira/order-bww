import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import { CartContext } from "../../App.js";
import Button from "../UI/Button/Button.jsx";

// Styles
import "./CartSidebar.css";

// Packages
import Decimal from "decimal.js";

function CartSidebar({ hide }) {
  const [cart, setCart, openCart, closeCart] = useContext(CartContext);
  let keys = [...cart.keys()];
  let total = new Decimal(0);
  keys.forEach((key) => {
    let b = new Decimal(cart.get(key).price * cart.get(key).quantity);
    total = total.plus(b);
  });

  return (
    <div className={"cart-sidebar " + (hide && "open")}>
      <div className="cart-sidebar__header">
        <span className="close" onClick={closeCart}>
          &times;
        </span>
        <h3 className="title">Your Cart</h3>
      </div>
      <ul className="cart-sidebar__list">
        {keys.map((key) => {
          let item = cart.get(key);

          return (
            <li className="cart-sidebar__item" key={item.id}>
              <div className="quantity">
                <span>{item.quantity}</span>
              </div>
              <div className="details">
                <span>{item.title}</span>
                <span>$ {item.price}</span>
              </div>
              <div className="options">
                <FontAwesomeIcon icon={faTrash} />
              </div>
            </li>
          );
        })}
      </ul>
      <div className="checkout">
        <Button isBold>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>Checkout</span>
            <span>$ {total.toFixed(2)}</span>
          </div>
        </Button>
      </div>
    </div>
  );
}

export default CartSidebar;
