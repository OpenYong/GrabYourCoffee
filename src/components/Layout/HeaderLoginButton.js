import React from "react";
import { Link } from "react-router-dom";

import styles from "./HeaderLoginButton.module.css";

const HeaderLoginButton = (props) => {
  return (
    <Link
      to="/user/login"
      className={`${styles.button}  `}
      onClick={props.onClick}
    >
      <span>LOG IN</span>
      <span className={styles.badge}></span>
    </Link>
  );
};

export default HeaderLoginButton;
