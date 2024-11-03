"use server";

const API_ROUTE = process.env.API_ADDRESS;

const getCashInfo = async (nationName) => {
  const cashRequ = await fetch(`${API_ROUTE}/cash/details/${nationName}`);
  const theCashJson = await cashRequ.json();
  return theCashJson;
};

export default getCashInfo;
