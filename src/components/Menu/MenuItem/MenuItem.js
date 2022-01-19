import styles from "./MenuItem.module.css";

const MenuItem = (props) => {
  return (
    <li className={styles.menu}>
      <div>
        <h3>{props.name}</h3>
        <div className={styles.description}>{props.description}</div>
        <div className={styles.price}>{props.price}원</div>
      </div>
      <div></div>
    </li>
  );
};

export default MenuItem;
