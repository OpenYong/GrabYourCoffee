import React, { useContext } from "react";

import { NavLink, Routes, Route, Link } from "react-router-dom";

import Profile from "../../../components/User/Account/Profile";
import AuthContext from "../../../store/auth-context";

import ShopsPage from "./ShopsPage";
import OrdersPage from "./OrdersPage";

import styles from "./AccountPage.module.css";

const AccountPage = () => {
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;

  return (
    <div>
      <div className={styles["account-header"]}>
        <Link to="account">Account</Link>
      </div>
      <div className={styles["account-container"]}>
        <div className={styles["account-sidebar"]}>
          <ul>
            <li>
              <NavLink to="profile">내 정보</NavLink>
            </li>
            <li>
              <NavLink to="orders">주문 내역</NavLink>
            </li>
            <li>
              <NavLink to="shops">카페 관리</NavLink>
            </li>
            <li>
              <NavLink
                to="#"
                onClick={(e) => {
                  e.preventDefault();
                  authCtx.logout();
                }}
              >
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
