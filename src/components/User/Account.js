import React, { useContext } from "react";

import AuthContext from "../../store/auth-context";

const Account = () => {
  const authCtx = useContext(AuthContext);
  const logoutHandler = () => {
    authCtx.logout();
  };
  return (
    <div>
      <div>asdasd</div>
      <button onClick={logoutHandler}>로그아웃</button>
    </div>
  );
};

export default Account;
