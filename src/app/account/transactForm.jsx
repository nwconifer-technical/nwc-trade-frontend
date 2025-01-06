"use client";
import react from "react";
import { useState, useActionState } from "react";
import { doPayment } from "./accountUtilites";
import Form from "next/form";

const TransactForm = (props) => {
  const initialState = {
    statusMessage: "",
    good: false,
    ...props,
  };
  const [state, formAction] = useActionState(doPayment, initialState);
  return (
    <Form action={formAction}>
      {state.statusMessage ? (
        <div className={`message ${state.good ? `is-success` : `is-danger`}`}>
          <div className="message-header">{state.statusMessage}</div>
        </div>
      ) : (
        ""
      )}
      <h3 className="subtitle is-5">Cash Transfer</h3>
      <div className="field">
        <label htmlFor="payerName" className="label">
          Payer
        </label>
        <input
          type="text"
          name="payerName"
          id="payerName"
          value={props.payerName}
          disabled={true}
          readOnly={true}
        />
      </div>
      <div className="field">
        <label className="label" htmlFor="payeeName">
          Payee
        </label>
        <input type="text" name="payeeName" id="payeeName" required />
      </div>
      <div className="field">
        <label className="label" htmlFor="value">
          Amount to Send ($):
        </label>
        <input
          type="number"
          name="amount"
          id="value"
          step={0.01}
          min={0.01}
          required
        />
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
