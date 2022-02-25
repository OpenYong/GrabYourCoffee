import React, { Fragment, useContext } from "react";
import { Link } from "react-router-dom";

import HeaderCartButton from "./HeaderCartButton";
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
          {!isLoggedIn && (
            <Link to="/user/login" className={`${styles.button}  `}>
              <span>LOG IN</span>
            </Link>
          )}
          {isLoggedIn && (
            <Link to="/user/account" className={`${styles.button}  `}>
              <span>My Account</span>
            </Link>
          )}
          <span className={styles.seperator}></span>
          <HeaderCartButton onClick={props.onShowCart} />
        </div>
      </header>
    </Fragment>
  );
};

export default Header;
