import react from "react";
import { decrypt } from "../cookieUtilities";
import { cookies } from "next/headers";
import { getCashInfo } from "./accountUtilites";
import TransactForm from "./transactForm";

const CashAccount = async () => {
  const cookieStore = await cookies();
  const sesh = cookieStore.get("session")?.value;
  const sessionCookie = await decrypt(sesh);
  const capitalReturn = await getCashInfo(sessionCookie.nationName);
  return (
    <>
      <div className="block">
        <h1 className="title is-1">Hello, {sessionCookie.nationName}</h1>
        <h3 className="title is-4">Cash Balance: ${capitalReturn.handCash}</h3>
        <h5 className="subtitle">
          Cash In Escrow: ${capitalReturn.escrowCash}
        </h5>
        <br />
        <div className="columns">
          <div className="column">
            <div className="box">
              <TransactForm
                payerName={sessionCookie.name}
                authKey={sessionCookie.authToken}
              />
            </div>
          </div>
          <div className="column">
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
                  {capitalReturn.transactions.map((transact) => (
                    <tr key={transact.timecode}>
                      <td>{transact.timecode}</td>
                      <td>{transact.sender}</td>
                      <td>{transact.receiver}</td>
                      <td>{transact.value}</td>
                      <td>{transact.message}</td>
                    </tr>
                  ))}
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
