import Cart from "../Cart/Cart";
import Logo from "../UI/Logo";
import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <nav className={styles["navbar"]}>
      <div className={["navbar-brand"]}>
        <a className={styles["navbar-item"] + " " + styles["logo"]} href="/">
          <Logo />
        </a>
      </div>
      <div className="navbar-menu">
        <Cart />
      </div>
    </nav>
  );
};

export default Navbar;
