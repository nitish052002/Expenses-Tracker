import React, { ChangeEvent, useEffect, useState } from "react";
import ReactModal from "react-modal";
import Tracker from "./components/Tracker";

const App: React.FC = () => {
  return <>
   <main className="app">
   <section className="expense-tracker">
    <div className="title">Expense Tracker</div>
     <Tracker/>
   </section>

   <section className="transaction-and-expenses">
    <div className="recent-transaction">
        
    </div>
    <div className="top-expenses">

    </div>
   </section>
   </main>
</>;
};

export default App;
