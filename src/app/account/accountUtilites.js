"use server";

const API_ROUTE = process.env.NEXT_PUBLIC_API_ADDRESS;

const getCashInfo = async (nationName) => {
  console.log(`${API_ROUTE}/cash/details/${nationName}`);
  const cashRequ = await fetch(`${API_ROUTE}/cash/details/${nationName}`);
  const theCashJson = await cashRequ.json();
  return theCashJson;
};

// type transactionFormat struct {
// 	Sender   string    `firestore:"sender" json:"sender"`
// 	Receiver string    `firestore:"receiver" json:"receiver"`
// 	Value    float64   `firestore:"value" json:"value"`
// 	Message  string    `firestore:"message,omitempty" json:"message"`
// }

const doPayment = async (prevState, formData) => {
  const receiver = formData.get("payeeName");
  const value = parseFloat(formData.get("amount"));
  const message = formData.get("message")
    ? formData.get("message")
    : "Cash Transfer";
  if (receiver == prevState.payerName) {
    return {
      good: false,
      statusMessage: "You must specify someone else",
      ...prevState,
    };
  }
  if (value < 0.0) {
    return {
      good: false,
      statusMessage: "Can't transfer nothing, or less than",
      ...prevState,
    };
  }
  if (value > prevState.currentCashAmount) {
    return {
      good: false,
      statusMessage: "Nice Try",
      ...prevState,
    };
  }
  const requestBody = JSON.stringify({
    Sender: prevState.payerName,
    receiver,
    value,
    message,
  });
  const reqRet = await fetch(`${API_ROUTE}/cash/transaction`, {
    method: "post",
    headers: {
      AuthKey: prevState.authKey,
      NationName: prevState.executorName,
    },
    body: requestBody,
  });
  console.log(reqRet.status);
  if (reqRet.status == 404) {
    return {
      good: false,
      statusMessage: "Payee does not exist",
      ...prevState,
    };
  }
  if (reqRet.status == 403) {
    return {
      good: false,
      statusMessage: "Unauthorised",
      ...prevState,
    };
  }
  if (reqRet.status == 200) {
    return {
      good: true,
      statusMessage: "Transfer Successful",
      ...prevState,
    };
  }
  console.log(reqRet.status);
  return {
    good: false,
    statusMessage: "Server or Other Error",
    ...prevState,
  };
};

export { getCashInfo, doPayment };
