import { useContext } from "react";
import { UserContext } from "../../App";
import Cart from "../Cart/Cart";
import Logo from "../UI/Logo";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    window.location.reload();
  };

  return (
    <nav className={styles["navbar"]}>
      <div className={["navbar-brand"]}>
        <a className={styles["navbar-item"] + " " + styles["logo"]} href="/">
          <Logo />
        </a>
      </div>
      <div className={styles["navbar-menu"]}>
        <p>Hi, {user.nickname}!</p>
        <a href="/orders" className={styles["navbar-item"]}>
          <p>Orders</p>
        </a>
        <Cart />
        <a
          onClick={handleLogout}
          className={styles["navbar-item"]}
          href="/logout"
        >
          <p className={styles["navbar-item"]}>Logout</p>
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
