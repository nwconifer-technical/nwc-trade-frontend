"use server";
import React from "react";

const API_ROUTE = process.env.API_ADDRESS;

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
      <h1 className="title is-2">Stock Holdings</h1>
      <table className="table">
        <thead>
          <tr>
            <td>Ticker</td>
            <td>Quantity</td>
            <td>Avg. Purchase Price</td>
            <td>Share Market Price</td>
            <td>Current Value</td>
          </tr>
        </thead>
        <tbody>
          {stockHoldJS.Holdings.length > 0 ? (
            stockHoldJS.Holdings.map(async (holding) => {
              const shareQuote = await fetch(
                `${API_ROUTE}/shares/quote/${holding.Ticker}`
              );
              const curQuote = await shareQuote.json();
              return (
                <tr key={holding.Ticker}>
                  <td>{holding.Ticker}</td>
                  <td>{holding.ShareQuantity}</td>
                  <td>${holding.AvgPrice}</td>
                  <td>${curQuote.marketPrice}</td>
                  <td>${curQuote.marketPrice * holding.ShareQuantity}</td>
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
    </div>
  );
};

export { HoldingsTable };
