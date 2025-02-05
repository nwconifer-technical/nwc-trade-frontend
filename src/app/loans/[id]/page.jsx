import React from "react";
import { cookies } from "next/headers";
import { decrypt } from "@/app/cookieUtilities";
import { getLoan } from "../loanUtilities";
import { RepaymentForm } from "../repaymentForm";
import { WriteOffForm } from "../writeOffForm";
import { redirect } from "next/navigation";

const ALoan = async ({ params }) => {
  const cookieStore = await cookies();
  const sesh = cookieStore.get("session")?.value;
  const sessionCookie = sesh ? await decrypt(sesh) : null;
  const loanId = (await params).id;
  const theLoan = await getLoan(
    loanId,
    sessionCookie.authToken,
    sessionCookie.name
  );
  if (!theLoan) return redirect(`/loans`);
  return (
    <div className="block">
      <div className="columns">
        <div className="column">
          <div className="box">
            <p className="title is-4">Loan Info</p>
            <div className="grid is-col-min-12">
              <div className="cell">Lent by {theLoan.TheLoan.lender}</div>
              <div className="cell">
                Interest Rate: {theLoan.TheLoan.loanRate}%
              </div>
              <div className="cell">
                Lent Value:
                {Intl.NumberFormat("en-UK", {
                  style: "currency",
                  currency: "USD",
                }).format(theLoan.TheLoan.lentValue)}
              </div>
              <div className="cell">
                Current Value:{" "}
                {Intl.NumberFormat("en-UK", {
                  style: "currency",
                  currency: "USD",
                  currencyDisplay: "narrowSymbol",
                }).format(theLoan.TheLoan.currentValue)}
              </div>
            </div>
          </div>
          <div className="box">
            <p className="title is-4">Loan Cash Transactions</p>
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
                {theLoan.LoanTransacts
                  ? theLoan.LoanTransacts.map((transact) => (
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
            </table>
          </div>
        </div>
        <div className="column">
          {theLoan.TheLoan.lendee == sessionCookie.name ||
          theLoan.TheLoan.lendee == sessionCookie.region ? (
            <div className="box">
              <p className="title is-5">Repay Loan</p>
              <RepaymentForm
                authKey={sessionCookie.authToken}
                name={sessionCookie.name}
                loanId={loanId}
              />
            </div>
          ) : (
            ""
          )}
          {theLoan.TheLoan.lender == sessionCookie.name ||
          (theLoan.TheLoan.lender == sessionCookie.region &&
            sessionCookie.permission != "citizen") ? (
            <div className="box">
              <h1 className="title is-5">Write-off Loan</h1>
              <p>This will instantly delete the selected loan!</p>
              <WriteOffForm
                authKey={sessionCookie.authToken}
                name={sessionCookie.name}
                loan={loanId}
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

export default ALoan;
