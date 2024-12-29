"use client";
import React, { useActionState } from "react";
import Form from "next/form";
import { sendTrade } from "./stockLandUtilities";

export const TradeForm = (props) => {
  const initialState = {
    statusMessage: "",
    good: false,
    authKey: props.authKey,
    traderName: props.traderName,
    acctName: props.acctName ? props.acctName : props.traderName,
    ticker: props.ticker ? props.ticker : "",
  };
  const [state, formAction] = useActionState(sendTrade, initialState);

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
          Trader
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
        <label htmlFor="ticker" className="label">
          Ticker to Trade
        </label>
        <input
          type="text"
          name="ticker"
          id="ticker"
          value={state.ticker ? state.ticker : ""}
          disabled={state.ticker ? true : false}
          readOnly={state.ticker ? true : false}
        />
      </div>
      <div className="field">
        <label htmlFor="direction" className="label">
          Trade Direction
        </label>
        <select name="direction" id="direction" className="select">
          <option value="buy">Buy</option>
          <option value="sell">Sell</option>
        </select>
      </div>
      <div className="field">
        <label htmlFor="quantity" className="label">
          Number of Shares
        </label>
        <input type="number" name="quantity" id="quantity" min={1} />
      </div>
      <div className="field">
        <label htmlFor="priceType" className="label">
          Price Type
        </label>
        <select name="priceType" id="priceType" className="select">
          <option value="market" defaultChecked>
            Market
          </option>
          <option value="limit">Limit</option>
        </select>
      </div>
      <div className="field">
        <label htmlFor="price" className="label">
          Limit Price <br />
          (Ony applies to limit orders)
        </label>
        <input type="number" name="price" id="price" step={0.01} min={0.01} />
      </div>
      <div className="field">
        <input type="submit" value="Submit" className="button is-primary" />
      </div>
    </Form>
  );
};
