import react from "react";
import Link from "next/link";

const index = () => {
  <div className="block">
    <h1>Welcome to the Site!</h1>
    <p>
      This will, eventually, be the premiere{" "}
      <Link href={"https://www.nationstates.net/"}>Nationstates</Link> region
      stock exchange, for now it&apos;s kinda empty.
    </p>
  </div>;
};

export default index;
