import React from "react";
import styles from "./App.module.css"
import Tracker from "./components/Tracker";
import Transaction from "./components/Transaction";
import Expenses from "./components/Expenses";

const App: React.FC = () => {
  return (
    <>
      <main className="app">
        <section className="expense-tracker">
          <div className={styles.title}>Expense Tracker</div>
          <Tracker />
        </section>

        <section className={styles.gridBox}>
          <div className="recent-transaction">
          <div className={styles.title}>Recent Transactions</div>
            <Transaction />
          </div>
          <div className="top-expenses">
          <div className={styles.title}>Top Expenses</div>
            <Expenses />
          </div>
        </section>
      </main>
    </>
  );
};

export default App;
