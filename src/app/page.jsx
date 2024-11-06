import react from "react";
import Link from "next/link";

const index = () => (
  <div className="block">
    <h1 className="title">Welcome to the Site!</h1>
    <p>
      This will, eventually, be the premiere{" "}
      <Link href={"https://www.nationstates.net/"}>Nationstates</Link> cash
      systems and region stock exchange, for now it&apos;s kinda empty. If you
      run a region, please get in touch with @alicolliar on Discord and I can
      add you to the system, probably.
    </p>
  </div>
);

export default index;
