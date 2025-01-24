import react from "react";
import Link from "next/link";
import { getAllNations } from "./homepageUtilities";

const index = async () => {
  const allNations = await getAllNations();
  return (
    <>
      <div className="block">
        <h1 className="title">Welcome to the New West Coniferan Exchange!</h1>
        <div>
          <p>
            This is a region stock exchange for the site{" "}
            <Link href={"https://nationstates.net"}>Nationsates</Link>, allowing
            you to trade shares in regions as <br />
            though they were companies. To sign up and start trading, go to the{" "}
            <Link href={"access/signup"}>signup page</Link>, for any questions{" "}
            <br />
            you may have, go to the{" "}
            <Link href={"/faq"}>Frequently Asked Questions</Link> page, and be
            sure to join our{" "}
            <Link href={"https://discord.gg/dDTQ9Zk5xf"}>Discord</Link>.
          </p>
        </div>
      </div>
      <div className="block">
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
                  <td>
                    {Intl.NumberFormat("en-UK", {
                      style: "currency",
                      currency: "USD",
                      currencyDisplay: "narrowSymbol",
                    }).format(nation.NetWorth)}
                  </td>
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
      <iframe
        src="https://discord.com/widget?id=1301990338713354250&theme=dark"
        width="350"
        height="200"
        allowtransparency="true"
        frameborder="0"
        sandbox="allow-same-origin allow-scripts"
      ></iframe>
    </>
  );
};

export default index;
