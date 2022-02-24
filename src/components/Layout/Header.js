import React, { Fragment } from "react";

import HeaderCartButton from "./HeaderCartButton";
import HeaderLoginButton from "./HeaderLoginButton";
import styles from "./Header.module.css";

const Header = (props) => {
  return (
    <Fragment>
      <header className={styles.header}>
        <h1>Grab Your Coffee</h1>
        <div className={styles.buttonContainer}>
          <HeaderLoginButton />
          <span className={styles.seperator}></span>
          <HeaderCartButton onClick={props.onShowCart} />
        </div>
      </header>
    </Fragment>
  );
};

export default Header;
