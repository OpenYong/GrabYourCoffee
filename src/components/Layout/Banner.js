import React from "react";

import coffeeImage from "../../assets/coffee-bar.jpg";

import styles from "./Banner.module.css";

const Banner = () => {
  return (
    <div className={styles.mainContainer}>
      <div className={styles["banner-text"]}>
        커피를 주문해 보세요. 좋아하는 원두 맛을 찾아보세요.
      </div>
      <div className={styles["main-image"]}>
        <img src={coffeeImage} alt="커피바 사진" />
      </div>
    </div>
  );
};

export default Banner;
