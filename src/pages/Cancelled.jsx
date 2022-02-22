// Success page after successful payment
import React from "react";
import Navbar from "../components/Navbar/Navbar";
import cancelledGIF from "../assets/images/cancelled-emoji.gif";

import styles from "./Cancelled.module.css";

export default function Cancelled() {
  setTimeout(() => {
    window.location.href = "/";
  }, 5000);
  return (
    <div>
      <Navbar />
      <div className={styles.container + " " + styles.center}>
        <img src={cancelledGIF} alt="Cancelled GIF" />
        <p className={styles.result}>
          Your order has not been placed. Please try again.
        </p>
        <small>You'll be redirected to main page in 5 seconds</small>
      </div>
    </div>
  );
}
