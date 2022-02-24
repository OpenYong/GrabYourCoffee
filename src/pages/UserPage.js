import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../components/User/Login";
import Signup from "../components/User/Signup";

const UserPage = () => {
  const [hasAccount, setHasAccount] = useState(false);

  const onClickHandler = (prevState) => {
    setHasAccount(!prevState);
  };

  return (
    <React.Fragment>
      <main>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Signup />} />
        </Routes>
      </main>
    </React.Fragment>
  );
};

export default UserPage;
