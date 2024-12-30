"use server";
const API_ROUTE = process.env.API_ADDRESS;

const getUserLoans = async (nationName, authKey) => {
  const fetched = await fetch(`${API_ROUTE}/loans`, {
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
  const body = JSON.stringify({
    lender: prevState.payerName,
    lendee,
    lentValue: amount,
    loanRate: interestRate,
  });
  console.log(body);
  const loanReturn = await fetch(`${API_ROUTE}/loan/issue`, {
    method: "POST",
    headers: {
      AuthKey: prevState.authKey,
      NationName: prevState.trader,
    },
    body,
  });
  console.log(loanReturn.status);
  if (loanReturn.status == 404) {
    return {
      good: false,
      statusMessage: "Lendee does not exist",
      ...prevState,
    };
  }
  if (loanReturn.status == 403) {
    return {
      good: false,
      statusMessage: "Unauthorized",
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

const getLoan = async (loanId, AuthKey, NationName) => {
  const fetched = await fetch(`${API_ROUTE}/loan/${loanId}`, {
    method: "GET",
    headers: {
      AuthKey,
      NationName,
    },
  });
  if (fetched.status != 200) {
    return null;
  }
  return await fetched.json();
};

const repayLoan = async (prevState, formData) => {
  const reqBod = JSON.stringify({
    LoanId: prevState.loanId,
    RepayAmount: parseFloat(formData.get("repayValue")),
  });
  console.log(reqBod);
  const theThing = await fetch(`${API_ROUTE}/loan/repay`, {
    method: "POST",
    body: reqBod,
    headers: {
      NationName: prevState.nationName,
      AuthKey: prevState.authKey,
    },
  });
  console.log(theThing.status);
};

const writeOff = async (prevState, formData) => {
  console.log(API_ROUTE);
  const writeOffAtt = await fetch(`${API_ROUTE}/loan/${prevState.loanId}`, {
    method: "DELETE",
    headers: {
      AuthKey: prevState.authKey,
      NationName: prevState.name,
    },
  });
  return null;
};

export { getUserLoans, issueLoan, getLoan, repayLoan, writeOff };
