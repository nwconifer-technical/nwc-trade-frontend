import react from "react";
import { decrypt } from "../cookieUtilities";
import { cookies } from "next/headers";
import { getCashInfo } from "./accountUtilites";
import TransactForm from "./transactForm";
import { redirect } from "next/navigation";
import { HoldingsTable } from "../stockHoldings";
import { PermissionEdit } from "./permissionForm";
import { TransferForm } from "../stocks/transferForm";

const CashAccount = async () => {
  const cookieStore = await cookies();
  const sesh = cookieStore.get("session")?.value;
  if (!sesh) {
    return redirect(`/`);
  }
  const sessionCookie = await decrypt(sesh);
  const capitalReturn = await getCashInfo(sessionCookie.name);
  return (
    <>
      <div className="block">
        <h1 className="title is-1">Hello, {sessionCookie.name}</h1>
        <div className="columns">
          <div className="column">
            <h3 className="title is-4">
              Cash Balance:{" "}
              {Intl.NumberFormat("en-UK", {
                style: "currency",
                currency: "USD",
                currencyDisplay: "narrowSymbol",
              }).format(capitalReturn.handCash)}
            </h3>
            <h5 className="subtitle">
              Cash In Escrow:
              {Intl.NumberFormat("en-UK", {
                style: "currency",
                currency: "USD",
                currencyDisplay: "narrowSymbol",
              }).format(capitalReturn.escrowCash)}
            </h5>
            <HoldingsTable
              authKey={sessionCookie.authToken}
              nationName={sessionCookie.name}
            />
            {sessionCookie.permission == "admin" ? (
              <PermissionEdit
                nationName={sessionCookie.name}
                authKey={sessionCookie.authToken}
              />
            ) : (
              ""
            )}
            <div className="box">
              <h3 className="subtitle is-5">Transfer Shares</h3>
              <TransferForm
                authKey={sessionCookie.authToken}
                traderName={sessionCookie.name}
              />
            </div>
          </div>
          <div className="column">
            <div className="box">
              <TransactForm
                payerName={sessionCookie.name}
                executorName={sessionCookie.name}
                authKey={sessionCookie.authToken}
                currentCashAmount={capitalReturn.handCash}
              />
            </div>
            <div className="box">
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
                  {capitalReturn.transactions
                    ? capitalReturn.transactions.map((transact) => (
                        <tr key={transact.timecode}>
                          <td>{transact.timecode}</td>
                          <td>{transact.sender}</td>
                          <td>{transact.receiver}</td>
                          <td>
                            {Intl.NumberFormat("en-UK", {
                              style: "currency",
                              currency: "USD",
                              currencyDisplay: "narrowSymbol",
                            }).format(transact.value)}
                          </td>
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

export default CashAccount;
