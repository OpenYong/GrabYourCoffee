import React, { useState, useEffect } from "react";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

let logoutTimer;

const calTime = (expireIn) => {
  const currentTime = new Date().getTime();
  const expTime = new Date(expireIn).getTime();

  const remainingTime = expTime - currentTime;

  return remainingTime;
};

// 브라우저에 저장된 토큰이 유효한 토큰인지 검사
const checkStoredToken = () => {
  const storedToken = localStorage.getItem("token");
  const storedExpTime = localStorage.getItem("expTime");

  const remainingTime = calTime(storedExpTime);

  if (remainingTime <= 0) {
    localStorage.removeItem("token");
    localStorage.removeItem("expTime");
    return null;
  }
  return {
    token: storedToken,
    remainingTime: remainingTime,
  };
};

export const AuthProvider = (props, expTime) => {
  const tokenAndTime = checkStoredToken();
  let initialToken;
  if (tokenAndTime) {
    initialToken = tokenAndTime.token;
  }
  const [token, setToken] = useState(initialToken);

  let isLoggedIn = !!token;

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("expTime");
    console.log("log - out");

    // 로그아웃을 할 때, logoutTimer가 있다면 logoutTimer를 없앤다.
    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  };

  const loginHandler = (token, expTime) => {
    setToken(token);
    localStorage.setItem("token", token);
    localStorage.setItem("expTime", expTime);

    console.log("loginHandler");

    const remainingTime = calTime(expTime); // 남은 시간 계산

    logoutTimer = setTimeout(logoutHandler, remainingTime); // 로그아웃 타이머 레퍼런스
  };

  useEffect(() => {
    if (tokenAndTime) {
      logoutTimer = setTimeout(logoutHandler, tokenAndTime.remainingTime);
    }
  }, [tokenAndTime]);

  const authContext = {
    token: token,
    isLoggedIn: isLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={authContext}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
