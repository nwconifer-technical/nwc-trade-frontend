import react from "react";
import { getAllEquities } from "./stockLandUtilities";
import Link from "next/link";

const AllEquities = async () => {
  const allStocks = await getAllEquities();
  return (
    <div className="block">
      <h1 className="title">All Stocks</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Ticker</th>
            <th>Region Name</th>
            <th>Market Capitalisation</th>
            <th>Total Share Volume</th>
            <th>Current Market Share Price</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {allStocks
            ? allStocks.allStocks.map((stock) => (
                <tr key={stock.ticker}>
                  <td>{stock.ticker}</td>
                  <td>{stock.region}</td>
                  <td>${stock.marketCap}</td>
                  <td>{stock.totalVolume}</td>
                  <td>${stock.marketPrice}</td>
                  <td>
                    <Link
                      href={`/stocks/${stock.ticker}`}
                      className="button is-link"
                    >
                      Stock Info
                    </Link>
                  </td>
                </tr>
              ))
            : "No Stocks Listed here"}
        </tbody>
        <tfoot>
          <tr>
            <th>Ticker</th>
            <th>Region</th>
            <th>Market Capitalisation</th>
            <th>Total Share Volume</th>
            <th>Current Market Share Price</th>
            <th></th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};
export default AllEquities;
