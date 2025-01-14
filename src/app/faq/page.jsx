import Link from "next/link";
import react from "react";

const FAQPage = () => (
  <>
    <h1 className="title">Frequently Asked Questions</h1>
    <div className="section">
      <h2 className="title is-3" id="genUsers">
        General Users
      </h2>
      <div className="block">
        <h3 className="subtitle is-3">What is this whole thing?</h3>
        <p>
          This is a stock exchange for Nationstates regions, allowing you to buy
          shares in them as though they were companies on an RL stock exchange.
          If you think it sounds familiar, I quite heavily cribbed the idea from
          the{" "}
          <Link
            href={"https://forum.nationstates.net/viewtopic.php?f=12&t=506403"}
          >
            Land&apos;s End Company Stock Exchange
          </Link>{" "}
          built by August in 2021, which was a far better implementation than
          what we have here, but this one seemed like it would be interesting.
        </p>
      </div>
      <div className="block">
        <h3 className="subtitle is-3">Ok, but how does it actually work?</h3>
        <ul style={{ listStyleType: "disc", listStylePosition: "inside" }}>
          <li>
            The NWCX is available through this site for all transactions, and
            market data can be viewed in the NWCX Discord Bot. If you wish to
            trade in the Exchange then you need to make sure the region you are
            resident in is registered and then sign up using the button in the
            corner.
          </li>
          <li>
            The exchange is hopefully not that hard to understand, there are
            some concepts that don&apos;t often turn up in these kind of virtual
            exchanges, but I believe in us.
          </li>
        </ul>
      </div>
      <div className="block">
        <h3 className="subtitle is-3">
          I want to buy some shares, yeah, capitalism, wooohooo! How do I do
          that?
        </h3>
        <ul style={{ listStyleType: "disc", listStylePosition: "inside" }}>
          <li>
            First go to the <Link href={"/stocks"}>All Stocks</Link> page, or
            use the /allstocks command in the Discord bot, and find a region
            that looks like a good investment. Clicking on Stock Info using the
            button attached (or using the /recentprices, /quote and /orderbook
            commands in the Discord bot) will give some more information and a
            graph of the last week of half-hourly logged prices.
          </li>
          <li>
            If you find a stock you like, simply fill out the trade form, this
            enters an open order into the exchange which will be open until it
            has been filled.
          </li>
          <li>
            Your trade will also move the price of the stock. This will likely
            only be visible in larger scale trades, but every trade will very
            slightly move the market capitalisation of a region
          </li>
        </ul>
      </div>
      <div className="block">
        <h3 className="subtitle is-3">
          How come you decided my region is worth $xxxx? That&apos;s way too
          low!
        </h3>
        <p>
          5 NS statistics are used and compared to preset values, these preset
          values are for a region worth $500 million, and all of the subsequent
          regions are compared to this. I didn&apos;t decide how much your
          region is worth, NS and my code did. While I reserve the right to
          change the specific stat mix or weighting, the preference will always
          be for whatever seems most interesting and fun.
        </p>
      </div>
      <div className="block">
        <h3 className="subtitle is-3">
          But what if I want to commit financial crime?
        </h3>
        <p>
          Yeah, so, the exchange is basically unregulated as regards to
          financial crime. If a region decides to pass laws governing financial
          regulation of their citizens, then I will use my
          &quot;superadmin&quot; powers (access to the database) to forcibly
          enforce these judgements, and the same if groups of regions start
          treaties governing cross-border transactions, but otherwise you are on
          your own.
        </p>
      </div>
    </div>
    <div className="section">
      <h2 className="title is-3" id="shareQ">
        Shares Questions
      </h2>
      <div className="block">
        <h3 className="subtitle is-3">
          I entered a trade, but I don&apos;t have all of my shares yet. What
          gives?
        </h3>
        <p>
          So, upon entering a hypothetical order to buy 100 shares of ABC at a
          market price of $100 the exchange will:
        </p>
        <ul style={{ listStyleType: "disc", listStylePosition: "inside" }}>
          <li>
            Look for any open sell orders at or below $100, if their are enough
            found open orders to fill your order, then it will be done.
          </li>
          <li>
            If there are not enough, or no, open orders for that asset at or
            below that price in the exchange to fill the order, then it is
            placed as an open buy order and will need to wait until someone
            submits an open sell at or below $100 to fill it.
          </li>
          <li>
            If left open, the exchange will automatically fill the order without
            notifying you, however, if you don&apos;t have enough cash to fill
            the order, then it will simply not fill and be left open.
          </li>
        </ul>
        <p>
          This type of exchange is, according to{" "}
          <Link href={"https://en.wikipedia.org/wiki/Central_limit_order_book"}>
            Wikipedia
          </Link>
          , a &quot;Central Limit Order Book&quot; and does require other
          traders to be active on the exchange to fill your orders.
        </p>
      </div>
      <div className="block">
        <h3 className="subtitle is-3">
          I keep trying to buy shares at market price, and I have enough money,
          but they keep failing, why?!
        </h3>
        <p>
          The exchange won&apos;t let you enter buy orders at market price if
          the current value of the order + 15% would be more than your current
          cash balance, this is to help stop price rises from causing errors
          with execution of market orders.
        </p>
      </div>
      <div className="block">
        <h3 className="subtitle is-3">
          Why did the price move on it&apos;s own?!
        </h3>
        <p>
          At 0015 UTC each night, the exchange updates the region&apos;s market
          capitalisation, and thus share price, by how much the 5 NS stats
          mentioned earlier have moved (normalised down to between -20% and
          +20%). I have no control over this, but regions that grow steadily and
          aim to optimise shareholder value should see their values steadily
          increase. Probably.
        </p>
      </div>
    </div>
    <div className="section">
      <h2 className="title is-3" id="regQ">
        Region Questions
      </h2>
      <div className="block">
        <h3 className="subtitle is-3">
          I run a region, can I get my region listed?
        </h3>
        <p>
          Sure! Fill out{" "}
          <Link href={"https://forms.gle/XsNRMPCPrCNG8Gfs8"}>this form</Link>{" "}
          and I&apos;ll get in touch with next steps.
        </p>
      </div>
      <div className="block">
        <h3 className="subtitle is-3">
          So, now my region&apos;s registered, what happens next?
        </h3>
        <p>
          Each region has a region account, which owns 1,000,000 shares in
          itself and has $1,000,000 in it&apos;s account. Every time someone
          signs up to your region, they&apos;ll get a $10,000 loan at 2.5%
          interest to the region, but the capital for the loan comes from the
          void. You can, and should, enter a sell order for some of the
          region&apos;s shares at some point, but maybe try and build some hype
          around the share and get some buy orders in before hand or you&apos;ll
          just annihilate the market price. Also,{" "}
          <b>
            <i>do not sell all the shares</i>
          </b>
          , this will just set the price to $0 and it may never recover.
        </p>
      </div>
      <div className="block">
        <h3 className="subtitle is-3">
          I can&apos;t be bothered to manage all of this region trading myself,
          is there a better way?
        </h3>
        <p>
          Yes, make someone else do it! You can change other users in your
          region&apos;s permissions to either &quot;citizen&quot;, no trading
          permissions, or &quot;trader&quot;, full trading, cash and loan
          permissions. This shouldn&quot;t be done lightly, as it gives that
          user lots of permissions over the region&quot;s NWCX account and no
          real traceability.
        </p>
      </div>
    </div>
    <div className="section">
      <h2 className="title is-3">Technical Questions</h2>
      <div className="block">
        <h3 className="subtitle is-3">
          What&apos;s this old sucker all run on then?
        </h3>
        <p>
          The backend is written in Go, this frontend is a NextJS React server
          and the Discord bot is a hacked together Python horror. All of these
          then run on various Google Cloud products and is all CIed with that
          stuff too.
        </p>
      </div>
      <div className="block">
        <h3 className="subtitle is-3">Can I maybe have a look the code?</h3>
        <p>
          Maybe! The frontend and bot are both public on the Github org,{" "}
          <Link href={"https://www.github.com/nwconifer-technical"}>
            nwconifer-technical
          </Link>{" "}
          and, eventually the backend will probably appear on there too. If you
          find an issue on the frontend or bot, and know how to fix it, then
          please do open up a PR in there and I&apos;ll get round to it.
        </p>
      </div>
    </div>
  </>
);

export default FAQPage;
