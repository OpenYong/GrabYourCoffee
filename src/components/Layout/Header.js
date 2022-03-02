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
        <span className={styles.logo}>
          <Link to="/">Grab Your Coffee</Link>
        </span>
        <div className={styles.buttonContainer}>
          {!isLoggedIn && (
            <Link to="/user/login" className={`${styles.button}  `}>
              <span>LOG IN</span>
            </Link>
          )}
          {isLoggedIn && (
            <Link to="/user/account" className={`${styles.button}  `}>
              <span>MY ACCOUNT</span>
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
