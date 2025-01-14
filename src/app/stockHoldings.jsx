"use server";
import React from "react";
import Link from "next/link";

const API_ROUTE = process.env.NEXT_PUBLIC_API_ADDRESS;

const HoldingsTable = async (props) => {
  var holdingsReq = null;
  if (props.region) {
    holdingsReq = await fetch(`${API_ROUTE}/shares/portfolio/${props.region}`, {
      headers: {
        AuthKey: props.authKey,
        NationName: props.nationName,
      },
    });
  } else {
    holdingsReq = await fetch(`${API_ROUTE}/shares/portfolio`, {
      headers: {
        AuthKey: props.authKey,
        NationName: props.nationName,
      },
    });
  }
  if (holdingsReq.status != 200) {
    return "";
  }
  const stockHoldJS = await holdingsReq.json();
  return (
    <div className="box">
      <h1 className="title is-3">Stock Data</h1>
      <h3 className="subtitle is-3">Stock Holdings</h3>
      <table className="table">
        <thead>
          <tr>
            <td>Ticker</td>
            <td>Quantity</td>
            <td>Avg. Purchase Price</td>
            <td>Share Market Price</td>
            <td>Current Value</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {stockHoldJS.Holdings ? (
            stockHoldJS.Holdings.map(async (holding) => {
              const shareQuote = await fetch(
                `${API_ROUTE}/shares/quote/${holding.Ticker}`
              );
              const curQuote = await shareQuote.json();
              return (
                <tr key={holding.Ticker}>
                  <td>{holding.Ticker}</td>
                  <td>{holding.ShareQuantity}</td>
                  <td>
                    {Intl.NumberFormat("en-UK", {
                      style: "currency",
                      currency: "USD",
                      currencyDisplay: "narrowSymbol",
                    }).format(holding.AvgPrice)}
                  </td>
                  <td>
                    {Intl.NumberFormat("en-UK", {
                      style: "currency",
                      currency: "USD",
                      currencyDisplay: "narrowSymbol",
                    }).format(curQuote.marketPrice)}
                  </td>
                  <td>
                    {Intl.NumberFormat("en-UK", {
                      style: "currency",
                      currency: "USD",
                      currencyDisplay: "narrowSymbol",
                    }).format(curQuote.marketPrice * holding.ShareQuantity)}
                  </td>
                  <td>
                    <Link
                      href={`/stocks/${holding.Ticker}`}
                      className="button is-link"
                    >
                      Stock Info
                    </Link>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td>You hold no shares</td>
            </tr>
          )}
        </tbody>
      </table>
      <h3 className="subtitle is-3">Your Open Orders</h3>
      <table className="table">
        <thead>
          <tr>
            <td>Trade ID</td>
            <td>Ticker</td>
            <td>Direction</td>
            <td>Quantity</td>
            <td>Price Type</td>
            <td>Share Price</td>
          </tr>
        </thead>
        <tbody>
          {stockHoldJS.OpenOrders ? (
            stockHoldJS.OpenOrders.map((order) => (
              <tr key={order.TradeId}>
                <td>{order.TradeId}</td>
                <td>{order.Ticker}</td>
                <td>{order.Direction}</td>
                <td>{Intl.NumberFormat("en-UK").format(order.Quantity)}</td>
                <td>{order.PriceType}</td>
                <td>
                  {Intl.NumberFormat("en-UK", {
                    style: "currency",
                    currency: "USD",
                    currencyDisplay: "narrowSymbol",
                  }).format(order.Price)}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td>No Open Orders</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export { HoldingsTable };
