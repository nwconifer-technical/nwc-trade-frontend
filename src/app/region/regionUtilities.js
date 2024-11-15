"use server";

const API_ROUTE = process.env.API_ADDRESS;

const getRegionInfo = async (nation, region, authKey) => {
  const received = await fetch(`${API_ROUTE}/region/${region}`, {
    headers: {
      AuthKey: authKey,
      NationName: nation,
    },
  });
  return received.json();
};

export { getRegionInfo };
