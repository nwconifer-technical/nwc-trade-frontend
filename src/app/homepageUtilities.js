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
  return nationRet.json();
};

export { getAllNations };
