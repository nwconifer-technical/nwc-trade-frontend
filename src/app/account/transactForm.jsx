"use client";
import react from "react";
import { useState, useActionState } from "react";
import { doPayment } from "./accountUtilites";
import Form from "next/form";

const TransactForm = (props) => {
  const initialState = {
    statusMessage: {
      good: true,
      message: "",
    },
    authKey: props.authKey,
  };
  const [state, formAction] = useActionState(doPayment, initialState);
  return (
    <Form action={formAction}>
      {state.statusMessage.message ? (
        <div
          className={`message ${
            statusMessage.good ? `is-success` : `is-danger`
          }`}
        >
          <div className="message-header">{state.statusMessage}</div>
        </div>
      ) : (
        ""
      )}
      <div className="field">
        <label htmlFor="payer" className="label">
          Payer
        </label>
        <input
          type="text"
          name="payer"
          id="payer"
          value={props.payerName}
          disabled
        />
      </div>
      <div className="field">
        <label className="label" htmlFor="sender">
          Payee
        </label>
        <input type="text" name="sender" id="sender" required />
      </div>
      <div className="field">
        <label className="label" htmlFor="value">
          Amount to Send ($):
        </label>
        <input type="number" name="amount" id="value" required />
      </div>
      <div className="field">
        <label className="label" htmlFor="message">
          Message
        </label>
        <input type="text" name="message" id="message" />
      </div>
      <div className="field">
        <button type="submit" className="button is-success" required>
          Submit
        </button>
      </div>
    </Form>
  );
};
export default TransactForm;