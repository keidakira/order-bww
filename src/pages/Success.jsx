// Success page after successful payment
import React from "react";
import Navbar from "../components/Navbar/Navbar";
import successGIF from "../assets/images/success-tick.gif";

import styles from "./Success.module.css";

export default function Success() {
  return (
    <div>
      <Navbar />
      <div className={styles.container + " " + styles.center}>
        <img src={successGIF} alt="Success GIF" />
        <p className={styles.result}>
          Your order has beel placed successfully!
        </p>
      </div>
    </div>
  );
}
