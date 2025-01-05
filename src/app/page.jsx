import react from "react";
import Link from "next/link";
import { getAllNations } from "./homepageUtilities";

const index = async () => {
  const allNations = await getAllNations();
  return (
    <div className="block">
      <div className="message is-danger">
        <div className="message-header">UNDER DEVELOPMENT</div>
        <div className="message-body">
          This site is still under development, is pretty unstable and cash
          balances will jump around. <br />
          Before going actually live, all trades, transactions, loans and user
          accounts will be deleted.
        </div>
      </div>
      <h1 className="title">Welcome to the Site!</h1>

      <p>
        This will, eventually, be the premiere{" "}
        <Link href={"https://www.nationstates.net/"}>Nationstates</Link> cash
        systems and region stock exchange, for now it&apos;s kinda empty. If you
        run a region, please get in touch with @alicolliar on Discord and I can
        add you to the system, probably.
      </p>
      <div className="box">
        <table className="table">
          <thead>
            <tr>
              <th>Nations</th>
              <th>Net Worth</th>
            </tr>
          </thead>
          <tbody>
            {allNations.Nations ? (
              allNations.Nations.map((nation) => (
                <tr key={nation.Name}>
                  <td>{nation.Name}</td>
                  <td>${nation.NetWorth}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td>No nations registered</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default index;
