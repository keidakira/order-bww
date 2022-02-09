import React from "react";

import styles from "./Button.module.css";

function Button({ children, isBold }) {
  let classes = ["btn"];

  if (isBold) {
    classes.push("bold");
  }

  let classList = "";
  classes.forEach((className) => {
    classList += styles[className] + " ";
  });

  return <button className={classList}>{children}</button>;
}

export default Button;
