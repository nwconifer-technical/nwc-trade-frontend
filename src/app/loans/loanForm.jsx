"use client";
import react from "react";
import Form from "next/form";
import { useState, useActionState } from "react";
import { issueLoan } from "./loanUtilities";

const LoanForm = (props) => {
  const initialState = {
    statusMessage: "",
    good: false,
    authKey: props.authKey,
    payerName: props.payerName,
  };
  const [state, formAction] = useActionState(issueLoan, initialState);
  return (
    <Form action={formAction}>
      {state.statusMessage ? (
        <div className={`message ${state.good ? `is-success` : `is-danger`}`}>
          <div className="message-header">{state.statusMessage}</div>
        </div>
      ) : (
        ""
      )}
      <div className="field">
        <label htmlFor="payer" className="label">
          Lender
        </label>
        <input
          type="text"
          name="lender"
          id="lender"
          value={props.payerName}
          disabled
        />
      </div>
      <div className="field">
        <label className="label" htmlFor="payeeName">
          Lendee
        </label>
        <input type="text" name="lendee" id="payeeName" required />
      </div>
      <div className="field">
        <label className="label" htmlFor="value">
          Amount to Lend ($):
        </label>
        <input type="number" name="amount" id="value" step={0.01} required />
      </div>
      <div className="field">
        <label className="label" htmlFor="intRate">
          Interest Rate (%)
        </label>
        <input type="number" name="rate" id="intRate" step={0.001} required />
      </div>
      <div className="field">
        <button type="submit" className="button is-success" required>
          Submit
        </button>
      </div>
    </Form>
  );
};

export default LoanForm;
