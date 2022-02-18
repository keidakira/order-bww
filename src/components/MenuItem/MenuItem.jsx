import { faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import DraftCartAPI from "../../api/DraftCart";
import { CartContext } from "../../App";

const MenuItem = ({ item }) => {
  const { title, image, price } = item;

  const [cart, setCart, ...rest] = useContext(CartContext);
  const [isAdded, setIsAdded] = useState(false);
  const [count, setCount] = useState(0);

  // Use this hook to update the cart state of + or - items
  const [changing, setChanging] = useState(false);

  useEffect(() => {
    const itemInCart = cart.items.find(({ item }) => item.title === title);

    if (itemInCart) {
      setCount(itemInCart.quantity);
      setIsAdded(true);
    } else {
      setCount(0);
      setIsAdded(false);
    }
  }, [cart]);

  const addToCart = async () => {
    // If item already exists in cart, increase quantity
    // else add item to cart
    if (changing) return;

    setChanging(true);

    const itemId = item._id;
    let quantity = 1;
    let response = undefined;

    const itemInCart = cart.items.find(({ item }) => item.title === title);

    if (itemInCart) {
      quantity = itemInCart.quantity + 1;
    }

    // If cart is empty, create a new cart
    // else update existing cart

    if (cart.items.length === 0) {
      response = await DraftCartAPI.createDraftCart(itemId, quantity);
    } else {
      response = await DraftCartAPI.updateDraftCart(itemId, quantity);
    }

    response = await DraftCartAPI.getDraftCart();

    setCart(response.data.draftCart);
    setIsAdded(true);
    setCount(count + 1);
    setChanging(false);
  };

  const removeFromCart = async () => {
    // If item exists in cart, decrease quantity
    // else remove item from cart

    if (changing) return;
    setChanging(true);

    const itemId = item._id;
    let quantity = 0;
    let response = undefined;

    const itemInCart = cart.items.find(({ item }) => item.title === title);

    if (itemInCart) {
      quantity = itemInCart.quantity - 1;
    }

    // If cart is empty, create a new cart
    // else update existing cart

    if (cart.items.length !== 0) {
      response = await DraftCartAPI.updateDraftCart(itemId, quantity);
    }

    response = await DraftCartAPI.getDraftCart();

    setCart(response.data.draftCart);
    setIsAdded(count - 1 > 0);
    setCount(count - 1);
    setChanging(false);
  };

  let addItem = (
    <span className="item-add" onClick={addToCart}>
      <FontAwesomeIcon icon={faPlus} />
    </span>
  );

  let changeItem = (
    <span className="item-change">
      <FontAwesomeIcon
        icon={count === 1 ? faTrash : faMinus}
        onClick={removeFromCart}
      />
      <span>{count}</span>
      <FontAwesomeIcon icon={faPlus} onClick={addToCart} />
    </span>
  );

  return (
    <li className="menu-list__item">
      <div className="menu-list__item-container">
        <div
          className="item-image"
          style={{
            backgroundImage: `url(${image})`,
          }}
        ></div>
        <div className="item-details">
          <span className="item-name">{title}</span>
          <span>$ {price}</span>
        </div>
        {isAdded === false ? addItem : changeItem}
      </div>
    </li>
  );
};

export default MenuItem;
