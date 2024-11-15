"use server";

const API_ROUTE = process.env.API_ADDRESS;

const getLoans = async (nationName, authKey) => {
  const fetched = await fetch(`${API_ROUTE}/loans/${nationName}`, {
    headers: {
      authKey,
      nationName,
    },
  });
  return fetched.json();
};

const issueLoan = async (prevState, formData) => {
  const lendee = formData.get("lendee");
  const amount = formData.get("amount");
  const interestRate = formData.get("rate")
    ? formData.get("message")
    : "Cash Transfer";
  if (lendee == prevState.payerName) {
    return {
      good: false,
      statusMessage: "Can't loan money to yourself",
      authKey: prevState.authKey,
      payerName: prevState.payerName,
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
      authKey: prevState.AuthKey,
      payerName: prevState.payerName,
    };
  }
  if (loanReturn.status != 201) {
    return {
      good: false,
      statusMessage: "Server or Other Error",
      authKey: prevState.AuthKey,
      payerName: prevState.payerName,
    };
  }
  const loanJson = await loanReturn.json();
  return {
    good: true,
    statusMessage: `Loan Created with ID ${loanJson.loanId}`,
    authKey: prevState.AuthKey,
    payerName: prevState.payerName,
  };
};
export { getLoans, issueLoan };
