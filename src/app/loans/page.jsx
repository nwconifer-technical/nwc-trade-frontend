import react from "react";
import { decrypt } from "../cookieUtilities";
import { cookies } from "next/headers";
import Link from "next/link";
import { getUserLoans } from "./loanUtilities";
import LoanForm from "./loanForm";

const LoanListings = async () => {
  const cookieStore = await cookies();
  const sesh = cookieStore.get("session")?.value;
  const sessionCookie = await decrypt(sesh);
  const allLoans = await getUserLoans(
    sessionCookie.nationName,
    sessionCookie.authToken
  );
  if (allLoans == "Server Error") {
    return <h1>Server error</h1>;
  }
  console.log(allLoans);
  return (
    <div className="block">
      <div className="columns">
        <div className="column">
          <div className="box">
            <h1 className="title is-1">Your Loans</h1>
            <h3 className="subtitle">All loans issued or owed by you.</h3>
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
                {allLoans.yourLoans
                  ? allLoans.yourLoans.map((loan) => (
                      <tr key={loan.id}>
                        <td>{loan.id}</td>
                        <td>{loan.lender}</td>
                        <td>{loan.lendee}</td>
                        <td>{loan.loanRate}%</td>
                        <td>${loan.lentValue}</td>
                        <td>${loan.currentValue}</td>
                        <td>
                          <Link
                            href={`/`} // Replace this when [loanId]/page.jsx is set up
                            className="button is-primary"
                          >
                            View More
                          </Link>
                        </td>
                      </tr>
                    ))
                  : "You have neither issued nor are due any loans"}
              </tbody>
            </table>
          </div>
        </div>
        <div className="column">
          <div className="box">
            <h2 className="title is-3">Issue Loan</h2>
            <LoanForm
              payerName={sessionCookie.nationName}
              authKey={sessionCookie.authToken}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoanListings;
