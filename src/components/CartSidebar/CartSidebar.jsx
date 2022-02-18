import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import DraftCartAPI from "../../api/DraftCart.js";
import { CartContext } from "../../App.js";
import Button from "../UI/Button/Button.jsx";

// Styles
import "./CartSidebar.css";

const submitHandler = (e) => {
  e.preventDefault();

  const form = document.getElementsByTagName("FORM")[0];
};

function CartSidebar({ hide }) {
  const [cart, setCart, openCart, closeCart] = useContext(CartContext);
  let { items, total } = cart;

  const removeItem = async (id) => {
    let response = await DraftCartAPI.updateDraftCart(id, 0);

    response = await DraftCartAPI.getDraftCart();

    setCart(response.data.draftCart);
  };

  return (
    <div className={"cart-sidebar " + (hide && "open")}>
      <div className="cart-sidebar__header">
        <span className="close" onClick={closeCart}>
          &times;
        </span>
        <h3 className="title">Your Cart</h3>
      </div>
      <form
        className="checkout"
        method="POST"
        action="http://localhost:4242/checkout"
        onSubmit={submitHandler}
      >
        <ul className="cart-sidebar__list">
          {items.map((itemObject) => {
            let item = itemObject.item;

            return (
              <li className="cart-sidebar__item" key={item._id}>
                <div className="quantity">
                  <span>{itemObject.quantity}</span>
                </div>
                <div className="details">
                  <span>{item.title}</span>
                  <span>$ {item.price}</span>
                </div>
                <div className="options" onClick={() => removeItem(item._id)}>
                  <FontAwesomeIcon icon={faTrash} />
                </div>
              </li>
            );
          })}
        </ul>
        <Button isBold>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>Checkout</span>
            <span>$ {parseFloat(total).toFixed(2)}</span>
          </div>
        </Button>
      </form>
    </div>
  );
}

export default CartSidebar;
