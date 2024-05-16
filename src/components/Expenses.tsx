import React, { useContext } from "react";
import styles from "./expenses.module.css";
import "./exp.css";
import { GlobalContext } from "../Store/GlobalContext";

interface Expense {
  category: string;
  price: number;
}

const Expenses: React.FC = () => {
  const { globalStore } = useContext(GlobalContext) || {
    globalStore: { expenses: [], wallet: 0 },
  };

  const maxValue = Math.max(
    ...globalStore.expenses.map((item: Expense) => item.price)
  );
 

  return (
    <div className={styles.expenseContainer}>
      {globalStore.expenses.map((item: Expense, index: number) => (
        <div key={index}>
          <p>{item.category}</p>
          <div
            className={styles.skills}
            style={{ width: `${(item.price / maxValue) * 100}%` }}
          ></div>
        </div>
      ))}
    </div>
  );
};

export default Expenses;
