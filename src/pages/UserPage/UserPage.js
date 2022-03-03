import React, { useState, useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import AuthContext from "../../store/auth-context";
import Login from "../../components/User/Login";
import Signup from "../../components/User/Signup";

import AccountPage from "./AccountPage/AccountPage";

const UserPage = () => {
  const authCtx = useContext(AuthContext);

  const [hasAccount, setHasAccount] = useState(false);

  const onClickHandler = (prevState) => {
    setHasAccount(!prevState);
  };

  return (
    <React.Fragment>
      <Routes>
        <Route path="login" element={<Login />} />
        {!authCtx.isLoggedIn && <Route path="register" element={<Signup />} />}
        <Route
          path="account/*"
          element={
            authCtx.isLoggedIn ? (
              <AccountPage />
            ) : (
              <Navigate replace to="/user/login" />
            )
          }
        />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </React.Fragment>
  );
};

export default UserPage;
