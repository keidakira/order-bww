import React from "react";

import styles from "./Input.module.css";

const Input = (props) => {
  return (
    <div className={styles["input-container"]}>
      <input
        className={styles.input}
        placeholder={props.placeholder}
        {...props}
      />
    </div>
  );
};

export default Input;
