import { useContext } from "react";
import { UserContext } from "../../App";
import Cart from "../Cart/Cart";
import Button from "../UI/Button/Button";
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
        <Cart />
        <p className={styles["logout"]} onClick={handleLogout}>
          Logout
        </p>
      </div>
    </nav>
  );
};

export default Navbar;
