import React, { useEffect, useContext, useState } from "react";

import { NavLink, Routes, Route, Link } from "react-router-dom";

import Profile from "../../../components/User/Account/Profile";
import Shops from "../../../components/User/Account/Shops";
import Orders from "../../../components/User/Account/Orders";

import ShopRegister from "../../../components/User/Account/ShopRegister";
import ShopManagement from "../../../components/User/Account/ShopManagement";

import AuthContext from "../../../store/auth-context";

import styles from "./AccountPage.module.css";

const AccountPage = () => {
  const [userData, setUserData] = useState({});
  const authCtx = useContext(AuthContext);

  const token = authCtx.token;

  // useEffect(() => {
  //   const fetchShopLists = async () => {
  //     const response = await fetch(`http://localhost:8080/auth/info`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });

  //     if (response.status === 404) {
  //       throw new Error("찾을 수 없는 데이터");
  //     }

  //     const responseData = await response.json();
  //     console.log(responseData);

  //     // setShopData({
  //     //   shopName: responseData.shop.shopName,
  //     //   imageUrl: `http://localhost:8080/${responseData.shop.imageUrl}`,
  //     //   description: responseData.shop.description,
  //     //   hasParkingLot: responseData.shop.hasParkingLot,
  //     //   hasTables: responseData.shop.hasTables,
  //     // });
  //   };

  //   fetchShopLists().catch((error) => {
  //     console.log(error);
  //   });
  // }, []);

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

          <Route path="orders" element={<Orders />} />

          <Route path="shops" element={<Shops />} />
          <Route path="shops/register" element={<ShopRegister />} />
          <Route path="shops/details/:shopId" element={<ShopManagement />} />
        </Routes>
      </div>
    </div>
  );
};

export default AccountPage;
