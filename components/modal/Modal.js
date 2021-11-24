import ReactDom from "react-dom";
import Image from "next/image";
import Link from "next/link";
import styles from "./Modal.module.css";

const Modal = ({ setOpen, data, isLoading }) => {
  return ReactDom.createPortal(
    data && (
      <div className={styles.modalBackground} onClick={() => setOpen(false)}>
        <div className={styles.modalContainer}>
          <div className={styles.header}>
            <div className={styles.title}>
              <h1>{data.data.message}</h1>
            </div>
            <div className={styles.titleCloseBtn}>
              <button onClick={() => setOpen(false)}>X</button>
            </div>
          </div>
          <Link href={data.data.uri}>
            <a className={styles.body}>
              <Image
                unoptimized
                src={data.data.coverImage.url}
                alt=""
                layout="fill"
                objectFit="cover"
                className={styles.image}
              />
            </a>
          </Link>
          <div className={styles.footer}>
            <button>
              <Link href={data.data.uri}>View in Spotify</Link>
            </button>
            <button onClick={() => setOpen(false)} id={styles.cancelBtn}>
              Close
            </button>
          </div>
        </div>
      </div>
    ),
    document.getElementById("modal")
  );
};

Modal.displayName = "Model";
export default Modal;
