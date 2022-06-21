import React, { useState, useEffect, useContext } from "react";

import AuthContext from "../../../../store/auth-context";
import useHttp from "../../../../hooks/use-http";

import styles from "./Profile.module.css";

const Profile = () => {
  const [userData, setUserData] = useState({});
  const authCtx = useContext(AuthContext);
  const { isLoading, error, sendRequest } = useHttp();

  const token = authCtx.token;

  useEffect(() => {
    const transformedData = (data) => {
      // console.log(data);
      setUserData(data);
    };

    sendRequest(
      {
        url: "http://localhost:8080/user/account/profile",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
      transformedData
    );
    console.log(userData);
  }, []);

  let content = (
    <div>
      <p>{userData.name}</p>
      <p>{userData.email}</p>
    </div>
  );

  if (!isLoading && error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>로딩중..</p>;
  }

  // if (!isLoading) {
  //   content = (
  //     <>
  //       <p>{userData.name}</p>
  //       <p>{userData.email}</p>
  //     </>
  //   );
  // }

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>내 정보</h1>
      <h2 className={styles.title}>프로필</h2>
      <div className={styles[`profile-container`]}>
        {content}
        <div>
          <a className={styles[`btn-edit`]} href="">
            내 정보 수정
          </a>
        </div>
      </div>
    </div>
  );
};

export default Profile;
