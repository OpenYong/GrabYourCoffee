import React from "react";

import styles from "./Button.module.css";

const Button = (props) => {
  return (
    <div
      className={`${props.className === "cancel" ? styles.cancel : styles.btn}`}
    >
      {props.children}
    </div>
  );
};

export default Button;
