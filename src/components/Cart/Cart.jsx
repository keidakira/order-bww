import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { CartContext } from "../../App";
import styles from "./Cart.module.css";

const Cart = () => {
  const [cart, setCart] = useContext(CartContext);

  return (
    <div className={styles["cart"]}>
      <FontAwesomeIcon icon={faShoppingCart} />
      <span>Cart &#8226; {cart.size}</span>
    </div>
  );
};

export default Cart;
