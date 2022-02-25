import React from "react";

import { NavLink, Routes, Route } from "react-router-dom";

import Profile from "../../../components/User/Account/Profile";
import Shops from "../../../components/User/Account/Shops";
import Orders from "../../../components/User/Account/Orders";

import styles from "./AccountPage.module.css";

const AccountPage = () => {
  return (
    <div className={styles["account-container"]}>
      <div className={styles["account-sidebar"]}>
        <ul>
          <li>
            <NavLink to="profile">마이페이지</NavLink>
          </li>
          <li>
            <NavLink to="orders">주문 내역</NavLink>
          </li>
          <li>
            <NavLink to="shops">카페 관리</NavLink>
          </li>
          <li>
            <NavLink to="">로그아웃</NavLink>
          </li>
        </ul>
      </div>
      <Routes>
        <Route path="profile" element={<Profile />} />
      </Routes>
      <Routes>
        <Route path="orders" element={<Orders />} />
      </Routes>
      <Routes>
        <Route path="shops" element={<Shops />} />
      </Routes>
    </div>
  );
};

export default AccountPage;
