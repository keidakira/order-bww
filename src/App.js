import { createContext, useEffect, useState } from "react";

import Banner from "./components/Banner/Banner";
import Navbar from "./components/Navbar/Navbar";
import "./App.css";
import MenuItem from "./components/MenuItem/MenuItem";
import CartSidebar from "./components/CartSidebar/CartSidebar";
import AuthPage from "./pages/AuthPage";

import MenuCategory from "./api/MenuCategory";

const CartContext = createContext(undefined);
const UserContext = createContext(undefined);

const App = () => {
  const [data, setData] = useState([]);
  const [cart, setCart] = useState(new Map());
  const [showCart, setShowCart] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    const menuCategories = new MenuCategory();

    const getAllMenuCategories = async () => {
      const response = await menuCategories.getAllMenuCategories();

      setData(response.data);
    };

    getAllMenuCategories();

    // Check if there is a token in localStorage
    const token = localStorage.getItem("token");

    if (token) {
      setIsLoggedIn(true);
      // Set the user
      setUser(JSON.parse(localStorage.getItem("user")));
    }
  }, []);

  const openCart = () => {
    setShowCart(true);
  };

  const closeCart = () => {
    setShowCart(false);
  };

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <CartContext.Provider
        value={[cart, setCart, openCart, closeCart, isLoggedIn]}
      >
        {isLoggedIn ? (
          <div>
            <Navbar />
            <Banner image="https://media2.sacurrent.com/sacurrent/imager/u/original/26618615/screen_shot_2021-02-12_at_11.47.27_am.png" />
            <main className="container">
              <div className="intro">
                <h1 className="title">Buffalo Wild Wings</h1>
                <small>Open until 12:00 AM</small>
              </div>
              <div className="menu">
                {data.map((itemList, index) => {
                  return (
                    <div className="menu-list" key={itemList._id}>
                      <h2 className="menu-list__title">{itemList.name}</h2>
                      <ul className="menu-list__items">
                        {itemList.items.map((item) => {
                          return <MenuItem item={item} key={item._id} />;
                        })}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </main>
            <CartSidebar hide={showCart} />
          </div>
        ) : (
          <AuthPage />
        )}
      </CartContext.Provider>
    </UserContext.Provider>
  );
};

export default App;
export { CartContext, UserContext };
