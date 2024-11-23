"use server";

const API_ROUTE = process.env.API_ADDRESS;

const getUserLoans = async (nationName, authKey) => {
  const fetched = await fetch(`${API_ROUTE}/loans/${nationName}`, {
    method: "GET",
    headers: {
      AuthKey: authKey,
      NationName: nationName,
    },
  });
  const statCode = fetched.status;
  if (statCode != 200) {
    console.log(statCode);
    return "Server Error";
  }
  const loanJson = await fetched.json();
  return loanJson;
};

const issueLoan = async (prevState, formData) => {
  const lendee = formData.get("lendee");
  const amount = parseFloat(formData.get("amount"));
  const interestRate = parseFloat(formData.get("rate"));
  if (lendee == prevState.payerName) {
    return {
      good: false,
      statusMessage: "Can't loan money to yourself",
      ...prevState,
    };
  }
  const loanReturn = await fetch(`${API_ROUTE}/loan/issue`, {
    method: "POST",
    headers: {
      AuthKey: prevState.authKey,
      NationName: prevState.payerName,
    },
    body: JSON.stringify({
      lender: prevState.payerName,
      lendee,
      lentValue: amount,
      loanRate: interestRate,
    }),
  });
  if (loanReturn.status == 404) {
    return {
      good: false,
      statusMessage: "Lendee does not exist",
      ...prevState,
    };
  }
  if (loanReturn.status != 201) {
    return {
      good: false,
      statusMessage: "Server or Other Error",
      ...prevState,
    };
  }
  const loanJson = await loanReturn.json();
  return {
    good: true,
    statusMessage: `Loan Created with ID ${loanJson.loanId}`,
    ...prevState,
  };
};
export { getUserLoans, issueLoan };
