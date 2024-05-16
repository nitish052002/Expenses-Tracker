import styles from "./transaction.module.css";
import { PiPizzaThin } from "react-icons/pi";
import { RxCrossCircled } from "react-icons/rx";
import { SlPencil } from "react-icons/sl";
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaArrowRightLong } from "react-icons/fa6";
import { useContext, useState } from "react";
import { GlobalContext } from "../Store/GlobalContext";
import Modal from "./Modal";

const Transaction = () => {
  const [initialDataModal] = useState(null);
  const [editModal, setEditModal] = useState(false);
  const { globalStore, updateGlobalStore } = useContext(GlobalContext) || {
    globalStore: { expenses: [], wallet: 0 },updateGlobalStore : () => {}
  };
  const [idForItem, setId] = useState(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 3;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = globalStore.expenses.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const numOfPage = Math.ceil(globalStore.expenses.length / 3);

  const closeModal = () => {
    if (editModal) {
      setEditModal(!editModal);
    }
  };

  const DATA__MODAL = {
    title: "",
    price: 0,
    category: "",
    date: "",
  };

  interface DATA__MODAL {
    id: number;
    title: string;
    price: number;
    category: string;
    date: string;
  }

  const removeExpense = (id: number) => {
    const UPDATED__DATA = globalStore.expenses.filter(
      (item) => item.id !== id
    );
    updateGlobalStore({
      ...globalStore,
      expenses: UPDATED__DATA,
    });
  };

  return (
    <div className={styles.transactionContainer}>
      <table>
        <tbody className={styles.tableBody}>
          {currentItems.map((item)=> {
            const ITEM_ID = item.id || 0
            return (
              <tr className={styles.row} key={item.id}>
                <td className={styles.cell}>
                  <div className={styles.icon}>
                    <PiPizzaThin />{" "}
                  </div>
                </td>

                <td className={styles.cell}>
                  <div className={styles.deatailContainer}>
                    <div className={styles.title}>{item.title}</div>
                    <div className={styles.date}>{item.date}</div>
                  </div>
                </td>
                <td className={styles.cell}>
                  <span className={styles.amount}>₹{item.price}</span>
                </td>
                <td className={styles.cell}>
                  <button
                    className={`${styles.deleteBtn} ${styles.btn}`}
                    onClick={() => {
                      removeExpense(ITEM_ID);
                    }}
                  >
                    <RxCrossCircled />
                  </button>
                </td>
                <td className={styles.cell}>
                  <button
                    className={`${styles.editBtn} ${styles.btn}`}
                    onClick={() => {
                      setEditModal(!editModal);
                      setId(ITEM_ID);
                      console.log(idForItem);
                    }}
                  >
                    <SlPencil />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>{" "}
      </table>

      <div className={styles.paginationContainer}>
        <button
          onClick={() => {
            currentPage !== 1 && setCurrentPage(currentPage - 1);
          }}
        >
          <FaArrowLeftLong />
        </button>
        <span className={styles.pageNum}>{currentPage}</span>
        <button
          onClick={() => {
            currentPage !== numOfPage && setCurrentPage(currentPage + 1);
          }}
        >
          <FaArrowRightLong />
        </button>
      </div>

      <Modal
        isModalActive={editModal}
        callBack={closeModal}
        initalObject={initialDataModal ? initialDataModal : DATA__MODAL}
        title="Add Expenses"
        type="add"
        id={idForItem}
      />
    </div>
  );
};

export default Transaction;
