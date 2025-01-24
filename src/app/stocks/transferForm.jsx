"use client";
import React, { useActionState } from "react";
import Form from "next/form";
import { transferShares } from "./stockLandUtilities";

export const TransferForm = (props) => {
  const initialState = {
    statusMessage: "",
    good: false,
    authKey: props.authKey,
    traderName: props.traderName,
    acctName: props.acctName ? props.acctName : props.traderName,
  };
  const [state, formAction] = useActionState(transferShares, initialState);

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
        <label htmlFor="trader" className="label">
          Account Transferring From
        </label>
        <input
          type="text"
          name="trader"
          id="trader"
          value={state.acctName}
          disabled={true}
          readOnly={true}
        />
      </div>
      <div className="field">
        <label htmlFor="receiver" className="label">
          Account to Send To
        </label>
        <input type="text" name="receiver" id="receiver" />
      </div>
      <div className="field">
        <label htmlFor="ticker" className="label">
          Ticker to Trade
        </label>
        <input type="text" name="ticker" id="ticker" />
      </div>
      <div className="field">
        <label htmlFor="quantity" className="label">
          Number of Shares
        </label>
        <input type="number" name="quantity" id="quantity" min={1} />
      </div>
      <div className="field">
        <input type="submit" value="Submit" className="button is-primary" />
      </div>
    </Form>
  );
};
