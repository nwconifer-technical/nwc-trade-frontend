import react from "react";
import Image from "next/image";
import Link from "next/link";
import signout from "./access/signout";

const Navbar = async (props) => {
  var userPerms = "";
  if (props.loggedIn) {
    userPerms = props.sessionCookie.permission;
    console.log(props.sessionCookie);
  }
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Image
          src={`/public/nsro.png`}
          alt="The NSRO Logo"
          width={175}
          height={75}
        />
      </div>
      <div className="navbar-menu">
        <Link href="/" className="navbar-item">
          Home
        </Link>
        {props.loggedIn ? (
          <Link href="/loans" className="navbar-item">
            Loans
          </Link>
        ) : (
          ""
        )}
        {userPerms == "trader" || userPerms == "admin" ? (
          <Link href={"/region"} className="navbar-item">
            My Region
          </Link>
        ) : (
          ""
        )}
      </div>
      <div className="navbar-end">
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
