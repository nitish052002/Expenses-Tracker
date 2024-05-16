import React, { useContext, useState } from "react";
import styles from "./model.module.css";
import { GlobalContext } from "../Store/GlobalContext";
import { useSnackbar } from "notistack";

 

interface FormData {
  title: string;
  price: number;
  category: string;
  date: string;
}

interface ModalProps {
  callBack: () => void;
  isModalActive: boolean;
  initalObject: FormData;
  type: string | undefined;
  title: string;
  id?: number | undefined;
}

const Modal: React.FC<ModalProps> = ({
  callBack,
  isModalActive,
  initalObject,
  type,
  title,
  id=0,
}) => {
  const [formData, setFormData] = useState<FormData>(initalObject);
  const [newWalletAmount, setWalletAmount] = useState<number>(0);
  const { globalStore, updateGlobalStore } = useContext(GlobalContext) || {
    globalStore: { expenses: [], wallet: 0 }, updateGlobalStore : ()=> {}
  };
  const { enqueueSnackbar } = useSnackbar();

  const removeStylesEvent = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    callBack();
  };

  const updateFormData = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const addAmountInWallet = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    updateGlobalStore({
      ...globalStore,
      wallet: globalStore.wallet + Number(newWalletAmount),
    });
  };

  const addNewExpense = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();

    if (type === "add") {
      if (id > 0) {
        const idx = globalStore.expenses.findIndex((item) => item.id === id);
        const OLD_DATA = globalStore.expenses.find((item) => item.id === id);
        const UPDATED_DATA = globalStore.expenses.map((item, index) =>
          index === idx ? { ...OLD_DATA, ...formData } : item
        );
        updateGlobalStore({
          ...globalStore  ,
          expenses: UPDATED_DATA ,
        });

        callBack();
        return;
      }

      if (Number(formData.price) > globalStore.wallet) {
        enqueueSnackbar("Insufficient Balance", {
          variant: "error",
          anchorOrigin: { vertical: "top", horizontal: "center" },
        });
        return;
      }

      updateGlobalStore({
        ...globalStore,
        expenses: [...globalStore.expenses, formData],
        wallet: globalStore.wallet - Number(formData.price),
      });
      callBack();
    }
  };

  return (
    <>
      {type === "add" ? (
        <div className={styles.modalContainer}>
          <div
            className={`${styles.modalBg} ${
              isModalActive ? styles.active : ""
            }`}
          ></div>
          <div
            className={`${styles.modalContent} ${
              isModalActive ? styles.active : ""
            }`}
          >
            <h2>{title}</h2>

            <form action="">
              <div className={styles.row}>
                <div className={styles.inputCell}>
                  <input
                    type="text"
                    placeholder="Title"
                    name="title"
                    onChange={updateFormData}
                    value={formData.title}
                  />
                </div>
                <div className={styles.inputCell}>
                  <input
                    type="number"
                    placeholder="Price"
                    name="price"
                    value={formData.price}
                    onChange={updateFormData}
                  />
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.inputCell}>
                  <input
                    type="text"
                    placeholder="Select Category"
                    name="category"
                    onChange={updateFormData}
                    value={formData.category}
                  />
                </div>
                <div className={styles.inputCell}>
                  <input
                    type="date"
                    placeholder="dd/mm/yyyy"
                    name="date"
                    onChange={updateFormData}
                    value={formData.date}
                  />
                </div>
              </div>
              <div className={styles.row}>
                <button
                  className={`${styles.modalBtn} ${styles.addBtn}`}
                  onClick={addNewExpense}
                >
                  Add Expense
                </button>
                <button
                  className={`${styles.modalBtn} ${styles.clBtn}`}
                  onClick={removeStylesEvent}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className={styles.modalContainer}>
          <div
            className={`${styles.modalBg} ${
              isModalActive ? styles.active : ""
            }`}
          ></div>
          <div
            className={`${styles.modalContent} ${
              isModalActive ? styles.active : ""
            }`}
          >
            <h2>Add Amount</h2>

            <form action="">
              <div className={styles.row}>
                <div className={styles.inputCell}>
                  <input
                    type="number"
                    placeholder="Enter amount"
                    min={0}
                    name="price"
                    onChange={(event) => {
                      setWalletAmount(Number(event.target.value));
                    }}
                    required
                    value={newWalletAmount}
                  />
                </div>

                <button
                  className={`${styles.modalBtn} ${styles.addBtn}`}
                  onClick={addAmountInWallet}
                >
                  Add Amount
                </button>
                <button
                  className={`${styles.modalBtn} ${styles.clBtn}`}
                  onClick={removeStylesEvent}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
