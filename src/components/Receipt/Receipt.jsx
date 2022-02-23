import React, { useState, useEffect } from "react";
import Button from "../UI/Button/Button";
import {
  ApplePay,
  GooglePay,
  Visa,
  MasterCard,
} from "../../assets/images/payments";
import styles from "./Receipt.module.css";

import client from "../../api";
import { formatDate } from "../../util/date";

export default function Receipt({ order, closeReceipt }) {
  const { items, createdAt, paymentSession: session } = order;
  const [paymentDetails, setPaymentDetails] = useState(null);

  const [card, setCard] = useState(null);

  const paymentId = session.paymentIntent;

  useEffect(() => {
    async function getPaymentDetails() {
      const { data } = await client.get(`/stripe/payment/${paymentId}`);

      setPaymentDetails(data);

      if (data.wallet !== null) {
        if (data.wallet === "apple_pay") {
          setCard({
            name: "MasterCard",
            wallet: "Apple Pay",
            image: ApplePay,
            last4: data.cardLast4,
          });
        } else {
          setCard({
            name: "Visa",
            wallet: "Google Pay",
            image: GooglePay,
            last4: data.cardLast4,
          });
        }
      } else {
        if (data.cardBrand === "visa") {
          setCard({
            name: "Visa",
            wallet: null,
            image: Visa,
            last4: data.cardLast4,
          });
        } else {
          setCard({
            name: "MasterCard",
            wallet: null,
            image: MasterCard,
            last4: data.cardLast4,
          });
        }
      }
    }

    getPaymentDetails();
  }, [paymentId]);

  return (
    <div className={styles["receipt-container"]}>
      <div className={styles["cover"]}>
        {!paymentDetails && (
          <p
            style={{
              background: "white",
              padding: "2rem",
              textAlign: "center",
            }}
          >
            Loading...
          </p>
        )}
        {paymentDetails && card && (
          <div className={styles["receipt-body"]}>
            <h1 className={styles["receipt-title"]}>
              Receipt from Buffalo Wild Wings
            </h1>
            <div className={styles["receipt-info"]}>
              <table className={styles["receipt-summary"]}>
                <tbody>
                  <tr>
                    <th>Amount Paid</th>
                    <th>Date</th>
                  </tr>
                  <tr>
                    <td>${paymentDetails.amount}</td>
                    <td>{formatDate(new Date(createdAt))}</td>
                  </tr>
                </tbody>
              </table>
              <hr />
              <h2>Your Items</h2>
              <table className={styles["receipt-items"]}>
                <tbody>
                  {items.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>
                          {item.item.title} x {item.quantity}
                        </td>
                        <td>${item.item.price * item.quantity}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <hr />
              <h2>Payment Method</h2>
              <table className={styles["receipt-payment"]}>
                <tbody>
                  <tr>
                    <td>
                      <img
                        className={styles["payment-image"]}
                        src={card.image}
                        alt={card.wallet || card.name}
                      />
                      <div className={styles["card-info"]}>
                        <span>{`${card.name} ${
                          card.wallet ? ` - ${card.wallet}` : ""
                        }`}</span>
                        <small>Ending with {card.last4}</small>
                      </div>
                    </td>
                    <td>${paymentDetails.amount}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className={styles["receipt-footer"]}>
              <p>Thank you for your order!</p>
              <br />
              <div className={styles["button-container"]}>
                <Button onClick={closeReceipt}>Close Receipt</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
