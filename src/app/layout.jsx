import { Figtree } from "next/font/google";
import "./bulma.min.css";
import { Navbar } from "./HeaderUnit";
import { cookies } from "next/headers";
import Script from "next/script";
import Link from "next/link";
import { decrypt } from "./cookieUtilities";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
// import "./myStyles.css";
const figtree = Figtree({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "NWCX",
  description: "New West Coniferan Exchange - A NS Stock Market Thing",
};

const RootLayout = async ({ children }) => {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session");
  var theCookie;
  if (sessionCookie) theCookie = await decrypt(sessionCookie.value);
  return (
    <html lang="en">
      <body className={figtree.className}>
        <AppRouterCacheProvider>
          <header className="header">
            <Navbar
              loggedIn={sessionCookie ? true : false}
              sessionCookie={theCookie}
            />
          </header>
          {children}
          <footer className="footer has-text-centered">
            <Link href="https://github.com/nwconifer-technical">
              Made by New West Conifer Technical
            </Link>
          </footer>
        </AppRouterCacheProvider>
      </body>
      <Script src="https://scripts.simpleanalyticscdn.com/latest.js" />
    </html>
  );
};

export default RootLayout;
