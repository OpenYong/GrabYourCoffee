import React, { Fragment } from "react";
import ReactDom from "react-dom";
import styles from "./Modal.module.css";

const portalElement = document.getElementById("overlays");

const Modal = (props) => {
  return (
    <Fragment>
      {ReactDom.createPortal(
        <div className={styles.backdrop} onClick={props.onClose}></div>,
        portalElement
      )}
      {ReactDom.createPortal(
        <div className={styles.modal}>
          <div className={styles.content}>{props.children}</div>
        </div>,
        portalElement
      )}
    </Fragment>
  );
};

export default Modal;
