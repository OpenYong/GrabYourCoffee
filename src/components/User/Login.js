import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div>
      <div>
        <span>안녕하세요 :) 로그인 해주세요.</span>
        <span>
          처음 오셨나요? <Link to="/user/register">회원 가입 하기</Link>
        </span>
      </div>
      <div>
        <form></form>
      </div>
    </div>
  );
};

export default Login;
