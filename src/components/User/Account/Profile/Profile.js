import React, { useState, useEffect, useContext } from "react";

import AuthContext from "../../../../store/auth-context";

import styles from "./Profile.module.css";

const Profile = () => {
  const [userData, setUserData] = useState();
  const authCtx = useContext(AuthContext);

  const token = authCtx.token;

  useEffect(() => {
    const fetchUserProfile = async () => {
      const response = await fetch(
        "http://localhost:8080/user/account/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const responseData = await response.json();

      console.log(responseData);
      setUserData(responseData);
    };
    fetchUserProfile().catch((error) => {
      console.log(error);
    });
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>내 정보</h1>
      <h2 className={styles.title}>프로필</h2>
      <div className={styles[`profile-container`]}>
        <p>{userData.name}</p>
        <p>{userData.email}</p>
      </div>
    </div>
  );
};

export default Profile;
