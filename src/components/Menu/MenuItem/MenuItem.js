import styles from "./MenuItem.module.css";

import MenuItemForm from "./MenuItemForm";

const MenuItem = (props) => {
  return (
    <li className={styles.menu}>
      <div>
        <h3>{props.name}</h3>
        <div className={styles.description}>{props.description}</div>
        <div className={styles.price}>{props.price}원</div>
      </div>
      <div>
        <MenuItemForm id={props.id} />
      </div>
    </li>
  );
};

export default MenuItem;
