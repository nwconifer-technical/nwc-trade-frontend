import react from "react";
import Image from "next/image";
import Link from "next/link";
import signout from "./access/signout";
import nwcx_Logo from "./nwcx_Logo.png";
import { quickCash } from "./homepageUtilities";

const Navbar = async (props) => {
  var cashVal = {};
  if (props.loggedIn) {
    cashVal = await quickCash(props.sessionCookie.name);
  }
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link href={"/"}>
          <Image src={nwcx_Logo} alt="The NSRO Logo" width={91} height={75} />
        </Link>
      </div>

      <div className="navbar-menu">
        <Link href="/" className="navbar-item">
          Home
        </Link>
        <Link href="/stocks" className="navbar-item">
          All Stocks
        </Link>
        {props.loggedIn ? (
          <>
            <Link href="/loans" className="navbar-item">
              My Loans
            </Link>
            <Link href={"/region"} className="navbar-item">
              My Region
            </Link>
          </>
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
