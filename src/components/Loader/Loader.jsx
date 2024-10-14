import { HashLoader } from "react-loader-spinner";
import styles from "./Loader.module.css";

export default function Loader () {
  return (
    <div className={styles.loader}>
      <HashLoader
        height="80"
        width="80"
        color="#9381ff"
        ariaLabel="hash-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};
