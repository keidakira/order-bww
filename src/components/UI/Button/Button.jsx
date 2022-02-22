import React from "react";

import styles from "./Button.module.css";

function Button({ children, isBold, onClick, outlined }) {
  let classes = ["btn"];

  if (isBold) {
    classes.push("bold");
  }

  if (outlined) {
    classes.push("btn-outlined");
  }

  let classList = "";
  classes.forEach((className) => {
    classList += styles[className] + " ";
  });

  return (
    <button className={classList} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
