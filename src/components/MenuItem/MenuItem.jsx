import { faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import { CartContext } from "../../App";

const MenuItem = ({ item }) => {
  const { title, image, price } = item;

  const [cart, setCart] = useContext(CartContext);
  const [isAdded, setIsAdded] = useState(false);
  const [count, setCount] = useState(0);

  const addToCart = () => {
    // If item already exists in cart, increase quantity
    // else add item to cart

    let cartCopy = new Map(cart);

    if (cartCopy.has(item.id)) {
      cartCopy.get(item.id).quantity += 1;
    } else {
      cartCopy.set(item.id, { ...item, quantity: 1 });
    }

    setCart(cartCopy);
    setIsAdded(true);
    setCount(count + 1);
  };

  const removeFromCart = () => {
    // If item exists in cart, decrease quantity
    let cartCopy = new Map(cart);

    if (cartCopy.has(item.id)) {
      cartCopy.get(item.id).quantity--;
      if (cartCopy.get(item.id).quantity === 0) {
        cartCopy.delete(item.id);
      }
    }

    setCart(cartCopy);
    setIsAdded(count - 1 !== 0);
    setCount(count - 1);
  };

  let addItem = (
    <span className="item-add">
      <FontAwesomeIcon icon={faPlus} onClick={addToCart} />
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
