import React from "react";

import styles from "./MenuSummary.module.css";

const MenuSummary = () => {
  return (
    <section className={styles.summary}>
      <h2>대한민국 최초의 로스터리 카페</h2>
      <p>
        우리는 맛있는 커피를 제공합니다. 모든 원두는 로스팅날짜로부터 2~10일된
        원두만을 사용합니다.
      </p>
    </section>
  );
};

export default MenuSummary;
