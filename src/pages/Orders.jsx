import React, { useEffect, useState } from "react";
import client from "../api";
import Navbar from "../components/Navbar/Navbar";
import Receipt from "../components/Receipt/Receipt";
import Button from "../components/UI/Button/Button";
import { formatDate } from "../util/date";
import styles from "./Orders.module.css";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [receiptOrder, setReceiptOrder] = useState(null);
  const [showReceipt, setShowReceipt] = useState(false);

  useEffect(() => {
    async function getOrder() {
      const response = await client.get(
        "/auth/orders/620ae94b949542abab2c4bd9"
      );

      setOrders(response.data.orders);
      setLoading(false);
    }

    getOrder();
  }, []);

  const openReceipt = (order) => {
    setReceiptOrder(order);
    setShowReceipt(!showReceipt);
  };

  const closeReceipt = () => {
    setShowReceipt(false);
  };

  return (
    <>
      <Navbar />
      <div className="container">
        {showReceipt && (
          <Receipt order={receiptOrder} closeReceipt={closeReceipt} />
        )}
        <h1 className="sub-title" style={{ padding: "2rem 0" }}>
          Orders
        </h1>
        {loading && <p>Loading...</p>}
        {!loading && (
          <div className={styles.orders}>
            {orders.map((order) => {
              let items = order.items.map((item) => {
                return `${item.quantity}x ${item.item.title}`;
              });
              let date = new Date(order.createdAt);

              return (
                <div className={styles.order} key={order._id}>
                  <div className={styles.order__body}>
                    <span className="sub-title">{formatDate(date)}</span>
                    <div className={styles["items-list"]}>
                      {items.join(", ")}
                    </div>
                    <div>
                      <strong>
                        $
                        {parseFloat(order.paymentSession.totalAmount).toFixed(
                          2
                        )}
                      </strong>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: "1rem" }}>
                    <Button onClick={() => openReceipt(order)}>
                      View Receipt
                    </Button>
                    <Button outlined>Reorder</Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
