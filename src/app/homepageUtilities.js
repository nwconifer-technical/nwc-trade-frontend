"use server";

const API_ROUTE = process.env.NEXT_PUBLIC_API_ADDRESS;

const getAllNations = async () => {
  console.log(`${API_ROUTE}/list/nations`);
  const nationRet = await fetch(`${API_ROUTE}/list/nations`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  const retJs = await nationRet.json();
  if (!retJs.Nations) {
    return { Nations: null };
  }
  retJs.Nations.sort((a, b) => b.NetWorth - a.NetWorth);
  return retJs;
};

const quickCash = async (name) => {
  const API_ROUTE = process.env.NEXT_PUBLIC_API_ADDRESS;
  const theFetched = await fetch(`${API_ROUTE}/cash/quick/${name}`);
  if (theFetched.status != 200) {
    return {
      CashInHand: 0,
    };
  }
  const theThing = await theFetched.json();
  return theThing;
};

export { getAllNations, quickCash };
