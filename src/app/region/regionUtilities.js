"use server";

import { redirect } from "next/navigation";

const API_ROUTE = process.env.NEXT_PUBLIC_API_ADDRESS;

const getRegionInfo = async (nation, region, authKey) => {
  const received = await fetch(`${API_ROUTE}/region/${region}`, {
    headers: {
      AuthKey: authKey,
      NationName: nation,
    },
  });
  if (received.status == 403) {
    return { message: "no" };
  }
  return received.json();
};

export { getRegionInfo };
