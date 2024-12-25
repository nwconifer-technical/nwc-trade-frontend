import React from "react";
import { getAStock } from "../stockLandUtilities";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { TradeForm } from "../tradeForm";
import { decrypt } from "@/app/cookieUtilities";

const AStock = async ({ params }) => {
  const cookieStore = await cookies();
  const sesh = cookieStore.get("session")?.value;
  const sessionCookie = sesh ? await decrypt(sesh) : null;
  const ticker = (await params).ticker;
  const theBook = await getAStock(ticker);
  if (!theBook) {
    return redirect("/stocks");
  }
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
                {(theBook.Buys ? theBook.Buys.length : 0) +
                  (theBook.Sells ? theBook.Sells.length : 0)}
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
                {theBook.Buys ? (
                  theBook.Buys.map((order) => (
                    <tr key={order.TradeId}>
                      <td>{order.Quantity}</td>
                      <td>{order.PriceType}</td>
                      <td>{order.Price}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td>No Open Buys</td>
                  </tr>
                )}
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
                {theBook.Sells ? (
                  theBook.Sells.map((order) => {
                    return (
                      <tr key={order.TradeId}>
                        <td>{order.Quantity}</td>
                        <td>{order.PriceType}</td>
                        <td>{order.Price}</td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td>No Open Sells</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="column">
          {sessionCookie ? (
            <div className="box">
              <h1 className="subtitle is-5">Trade Form</h1>
              <TradeForm
                authKey={sessionCookie.authToken}
                traderName={sessionCookie.name}
                ticker={ticker}
              />
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};
export default AStock;
