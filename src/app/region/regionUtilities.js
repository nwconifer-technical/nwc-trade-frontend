"use server";

import { redirect } from "next/navigation";

const API_ROUTE = process.env.API_ADDRESS;

const getRegionInfo = async (nation, region, authKey) => {
  console.log(`${API_ROUTE}/region/${region}`);
  const received = await fetch(`${API_ROUTE}/region/${region}`, {
    headers: {
      AuthKey: authKey,
      NationName: nation,
    },
  });
  if (received.status == 403) {
    return redirect(`/`);
  }
  return received.json();
};

export { getRegionInfo };
