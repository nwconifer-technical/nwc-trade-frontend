import react from "react";
import Image from "next/image";
import Link from "next/link";
import signout from "./access/signout";

const quickCash = async (name) => {
  const API_ROUTE = process.env.NEXT_PUBLIC_API_ADDRESS;
  const theFetched = await fetch(`${API_ROUTE}/cash/quick/${name}`);
  if (theFetched.status != 200) {
    return {
      CashInHand: 0,
    };
  }
  return await theFetched.json();
};

const Navbar = async (props) => {
  var userPerms = "";
  var cashVal = {};
  if (props.loggedIn) {
    userPerms = props.sessionCookie.permission;
    cashVal = await quickCash(props.sessionCookie.name);
  }
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Image
          src={"/nwcx_Logo.png"}
          alt="The NSRO Logo"
          width={91}
          height={75}
        />
      </div>
      <div className="navbar-menu">
        <Link href="/" className="navbar-item">
          Home
        </Link>
        <Link href="/stocks" className="navbar-item">
          All Stocks
        </Link>
        {props.loggedIn ? (
          <Link href="/loans" className="navbar-item">
            My Loans
          </Link>
        ) : (
          ""
        )}
        {userPerms != "citizen" ? (
          <Link href={"/region"} className="navbar-item">
            My Region
          </Link>
        ) : (
          ""
        )}
      </div>
      <div className="navbar-end">
        {props.loggedIn ? (
          <div className="navbar-item">
            Hello, {props.sessionCookie.name}. <br />
            You have ${cashVal.CashInHand} in cash
          </div>
        ) : (
          ""
        )}
        <div className="navbar-item">
          <div className="buttons">
            {props.loggedIn ? (
              <>
                <Link href="/account" className="button is-primary">
                  My Account
                </Link>
                <Link href="/" onClick={signout} className="button is-danger">
                  Log Out
                </Link>
              </>
            ) : (
              <>
                <Link href="/access/signup" className="button is-primary">
                  Sign Up
                </Link>
                <Link href="/access/login" className="button is-secondary">
                  Log In
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export { Navbar };
