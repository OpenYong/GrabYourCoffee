import React, { useContext } from "react";

import { NavLink, Routes, Route, Link, useLocation } from "react-router-dom";

import Profile from "../../../components/User/Account/Profile";
import AuthContext from "../../../store/auth-context";

import ShopsPage from "./ShopsPage";
import OrdersPage from "./OrdersPage";

import styles from "./AccountPage.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRectangleList } from "@fortawesome/free-regular-svg-icons";
import {
  faArrowRightFromBracket,
  faCircleUser,
  faStore,
  faBox,
} from "@fortawesome/free-solid-svg-icons";

const AccountPage = () => {
  const location = useLocation();
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;

  console.log(location);

  return (
    <div className={styles["mian-container"]}>
      <div className={styles["account-header"]}>
        <Link to="profile">Account</Link>
        <span> / </span>
      </div>
      <div className={styles["account-container"]}>
        <div className={styles["account-sidebar"]}>
          <ul className={styles["sidebar-list"]}>
            <li>
              <NavLink to="profile">
                <FontAwesomeIcon icon={faCircleUser} />내 정보
              </NavLink>
            </li>
            <li>
              <NavLink to="orders">
                <FontAwesomeIcon icon={faBox} />
                주문 내역
              </NavLink>
            </li>
            <li>
              <NavLink to="shops">
                <FontAwesomeIcon icon={faStore} />
                카페 관리
              </NavLink>
            </li>
            <li>
              <NavLink
                to="#"
                onClick={(e) => {
                  e.preventDefault();
                  authCtx.logout();
                }}
              >
                <FontAwesomeIcon icon={faArrowRightFromBracket} />
                로그아웃
              </NavLink>
            </li>
          </ul>
        </div>
        <Routes>
          <Route path="profile" element={<Profile />} />
          <Route path="orders/*" element={<OrdersPage />} />
          <Route path="shops/*" element={<ShopsPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default AccountPage;
