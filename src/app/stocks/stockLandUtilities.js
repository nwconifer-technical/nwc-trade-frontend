"use server";

const API_ROUTE = process.env.API_ADDRESS;

export const getAllEquities = async () => {
  const cashRequ = await fetch(`${API_ROUTE}/shares/quote`);
  const theCashJson = await cashRequ.json();
  return theCashJson;
};

export const getAStock = async (shareTicker) => {
  const cashRequ = await fetch(`${API_ROUTE}/shares/book/${shareTicker}`);
  const theCashJson = await cashRequ.json();
  return theCashJson;
};
