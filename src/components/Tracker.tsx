import   { useContext, useState } from "react";
import styles from "./tracker.module.css";
import Chart from "./Chart";
import Modal from "./Modal";
import { GlobalContext } from "../Store/GlobalContext";

const Tracker = () => {
  const [expensesmodal, setExpensesModal] = useState(false);
  const [walletModal, setWalletModal] = useState(false);
  const { globalStore } = useContext(GlobalContext)  || {
    globalStore: { expenses: [], wallet: 0 },
  };
  const [type, setType] = useState<string>();   

  const closeModal = () => {
    if (expensesmodal) {
      setExpensesModal(!expensesmodal);
    }

    if (walletModal) {
      setWalletModal(!walletModal);
    }
  };

  const DATA__MODAL = {
    title: "",
    price: 0,
    category: "",
    date: "",
  };

  const TOTAL_EXPENSES = globalStore.expenses.reduce((total ,item)=> total + item.price,0)

  return (
    <div className={styles.expenseContainer}>
      <div className={styles.content}>
        <div className={styles.wallet}>
          <div className={styles.balance}>
            <span className={styles.label}>Wallet Balance :</span>
            <span className={styles.amount}>₹{globalStore.wallet}</span>
          </div>
          <button
            className={`${styles.btn} ${styles.incomeBtn}`}
            onClick={() => {
              setExpensesModal(!walletModal);
              setType("bal")
            }}
          >
            + Add Income
          </button>
        </div>

        <div className={styles.expenses}>
          <div className={styles.balance}>
            <span className={styles.label}>Expenses : </span>
            <span className={styles.amount}>₹{TOTAL_EXPENSES}</span>
          </div>
          <button
            className={`${styles.btn} ${styles.ExpBtn}`}
            onClick={() => {
              setExpensesModal(!expensesmodal);
              setType("add");
            }}
          >
            + Add Income
          </button>
        </div>

        <div className={styles.chart}>
          <Chart />
        </div>
      </div>

      <Modal
        isModalActive={expensesmodal || walletModal}
        callBack={closeModal}
        initalObject={DATA__MODAL}
        type={type}
        title="Add Expenses"
      />
    </div>
  );
};

export default Tracker;
