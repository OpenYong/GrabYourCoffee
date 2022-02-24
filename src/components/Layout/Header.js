import React, { Fragment, useContext } from "react";

import HeaderCartButton from "./HeaderCartButton";
import HeaderLoginButton from "./HeaderLoginButton";
import styles from "./Header.module.css";

import AuthContext from "../../store/auth-context";

const Header = (props) => {
  const authCtx = useContext(AuthContext);

  const isLoggedIn = authCtx.isLoggedIn;

  return (
    <Fragment>
      <header className={styles.header}>
        <h1>Grab Your Coffee</h1>
        <div className={styles.buttonContainer}>
          {!isLoggedIn && <HeaderLoginButton />}
          <span className={styles.seperator}></span>
          <HeaderCartButton onClick={props.onShowCart} />
        </div>
      </header>
    </Fragment>
  );
};

export default Header;
