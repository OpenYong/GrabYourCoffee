import React from "react";

import styles from "./LoginSignupUI.module.css";

const LoginSignupUI = (props) => {
  return <div className={styles["main-container"]}>{props.children}</div>;
};

export default LoginSignupUI;
