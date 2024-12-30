import React from "react";
import { cookies } from "next/headers";
import { decrypt } from "../cookieUtilities";
import Link from "next/link";
import { getRegionInfo } from "./regionUtilities";
import TransactForm from "../account/transactForm";
import LoanForm from "../loans/loanForm";
import { TradeForm } from "../stocks/tradeForm";
import { HoldingsTable } from "../stockHoldings";

const RegionAccount = async () => {
  const cookieStore = await cookies();
  const sesh = cookieStore.get("session")?.value;
  const sessionCookie = await decrypt(sesh);
  const regionInfo = await getRegionInfo(
    sessionCookie.name,
    sessionCookie.region,
    sessionCookie.authToken
  );
  if (regionInfo.message) {
    return (
      <div className="block">
        <div className={`message is-danger`}>
          <div className="message-header">
            It seems you&apos;re not allowed here
          </div>
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="block">
        <h1 className="title is-1">{sessionCookie.region} Account Details</h1>
        <h3 className="title is-4">Cash Balance: ${regionInfo.HandValue}</h3>
        <h5 className="subtitle">Cash In Escrow: ${regionInfo.EscrowValue}</h5>
        <br />
        <div className="columns">
          <div className="column">
            <div className="box">
              <TransactForm
                payerName={sessionCookie.region}
                executorName={sessionCookie.name}
                authKey={sessionCookie.authToken}
                currentCashAmount={regionInfo.HandValue}
              />
            </div>
            <HoldingsTable
              region={sessionCookie.region}
              authKey={sessionCookie.authToken}
              nationName={sessionCookie.name}
            />
            <div className="box">
              <TradeForm
                acctName={sessionCookie.region}
                authKey={sessionCookie.authToken}
                traderName={sessionCookie.name}
              />
            </div>
          </div>
          <div className="column">
            <LoanForm
              authKey={sessionCookie.authToken}
              payerName={sessionCookie.region}
              trader={sessionCookie.name}
            />
            <div className="box">
              <h5 className="subtitle">Existing Loans</h5>
              <table className="table">
                <thead>
                  <tr>
                    <td>Loan ID</td>
                    <td>Lender</td>
                    <td>Lendee</td>
                    <td>Interest Rate</td>
                    <td>Lent Amount</td>
                    <td>Current Value</td>
                    <td />
                  </tr>
                </thead>
                <tbody>
                  {regionInfo.Loans ? (
                    regionInfo.Loans.map((loan) => (
                      <tr key={loan.id}>
                        <td>{loan.id}</td>
                        <td>{loan.lender}</td>
                        <td>{loan.lendee}</td>
                        <td>{loan.loanRate}%</td>
                        <td>${loan.lentValue}</td>
                        <td>${loan.currentValue}</td>
                        <td>
                          <Link
                            href={`/loans/${loan.id}`} // Replace this when [loanId]/page.jsx is set up
                            className="button is-primary"
                          >
                            View More
                          </Link>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr key="noLoans">
                      <td>You have neither issued nor are due any loans.</td>
                    </tr>
                  )}
                </tbody>
              </table>
              <h5 className="subtitle">Recent Cash Transactions</h5>
              <table className="table">
                <thead>
                  <tr>
                    <th>Timecode</th>
                    <th>Payer</th>
                    <th>Payee</th>
                    <th>Value</th>
                    <th>Message</th>
                  </tr>
                </thead>
                <tbody>
                  {regionInfo.CashTransacts
                    ? regionInfo.CashTransacts.map((transact) => (
                        <tr key={transact.timecode}>
                          <td>{transact.timecode}</td>
                          <td>{transact.sender}</td>
                          <td>{transact.receiver}</td>
                          <td>${transact.value}</td>
                          <td>{transact.message}</td>
                        </tr>
                      ))
                    : "No Transactions here"}
                </tbody>
                <tfoot>
                  <tr>
                    <th>Timecode</th>
                    <th>Payer</th>
                    <th>Payee</th>
                    <th>Value</th>
                    <th>Message</th>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegionAccount;
