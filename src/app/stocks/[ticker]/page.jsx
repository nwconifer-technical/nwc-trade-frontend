import React from "react";
import { getAStock } from "../stockLandUtilities";
import { cookies } from "next/headers";

const AStock = async ({ params }) => {
  const cookieStore = await cookies();
  const sesh = cookieStore.get("session")?.value;
  const ticker = (await params).ticker;
  const theBook = await getAStock(ticker);
  console.log(theBook);
  return (
    <div className="block">
      <h1 className="title">
        {ticker} - {theBook.CurrentQuote.region}
      </h1>
      <h2 className="subtitle">
        Share Price: ${theBook.CurrentQuote.marketPrice}
      </h2>
      <div className="columns">
        <div className="column">
          <div className="box">
            <p className="subtitle is-5">Stock Info</p>
            <div className="grid is-col-min-12">
              <div className="cell">
                Market Capitalisation: ${theBook.CurrentQuote.marketCap}
              </div>
              <div className="cell">
                Total Share Volume: {theBook.CurrentQuote.totalVolume}
              </div>
              <div className="cell">Order Book Depth: {theBook.BookDepth}</div>
              <div className="cell">
                Number of Open Orders:{" "}
                {theBook.Buys.length + theBook.Sells.length}
              </div>
            </div>
          </div>
          <div className="box">
            <h1 className="subtitle is-5">Trade Book</h1>
            <h2 className="subtitle is-6">Open Buys</h2>
            <table className="table">
              <thead>
                <tr>
                  <td>Quantity</td>
                  <td>Price Type</td>
                  <td>Price Level</td>
                </tr>
              </thead>
              <tbody>
                {theBook.Buys.length > 0
                  ? theBook.Buys.map((order) => (
                      <tr key={order.TradeId}>
                        <td>{order.Quantity}</td>
                        <td>{order.PriceType}</td>
                        <td>{order.Price}</td>
                      </tr>
                    ))
                  : "No Open Buys"}
              </tbody>
            </table>
            <h2 className="subtitle is-6">Open Sells</h2>
            <table className="table">
              <thead>
                <tr>
                  <td>Quantity</td>
                  <td>Price Type</td>
                  <td>Price Level</td>
                </tr>
              </thead>
              <tbody>
                {theBook.Sells.length > 0
                  ? theBook.Sells.map((order) => (
                      <tr key={order.TradeId}>
                        <td>{order.Quantity}</td>
                        <td>{order.PriceType}</td>
                        <td>{order.Price}</td>
                      </tr>
                    ))
                  : "No Open Sells"}
              </tbody>
            </table>
          </div>
        </div>
        <div className="column"></div>
      </div>
    </div>
  );
};
export default AStock;
