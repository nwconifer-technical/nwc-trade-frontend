"use server";

const API_ROUTE = process.env.API_ADDRESS;

const getCashInfo = async (nationName) => {
  const cashRequ = await fetch(`${API_ROUTE}/cash/details/${nationName}`);
  const theCashJson = await cashRequ.json();
  return theCashJson;
};

// type transactionFormat struct {
// 	Sender   string    `firestore:"sender" json:"sender"`
// 	Receiver string    `firestore:"receiver" json:"receiver"`
// 	Value    float64   `firestore:"value" json:"value"`
// 	Message  string    `firestoe:"message,omitempty" json:"message"`
// }

const doPayment = async (prevState, formData) => {
  const receiver = formData.get("payeeName");
  const value = formData.get("amount");
  const message = formData.get("message")
    ? formData.get("message")
    : "Cash Transfer";
  const reqRet = await fetch(`${API_ROUTE}/cash/transaction`, {
    method: "post",
    headers: {
      AuthKey: prevState.authKey,
      NationName: prevState.payerName,
    },
    body: JSON.stringify({
      sender: prevState.payerName,
      receiver,
      value,
      message,
    }),
  });
  if (reqRet.status == 404) {
    return {
      good: false,
      statusMessage: "Payee does not exist",
      authKey: prevState.authKey,
      payerName: prevState.payerName,
    };
  }
  if (reqRet.status == 200) {
    return {
      good: true,
      statusMessage: "Transfer Successful",
      authKey: prevState.authKey,
      payerName: prevState.payerName,
    };
  }
  console.log(reqRet.status);
  return {
    good: false,
    statusMessage: "Server or Other Error",
    authKey: prevState.authKey,
    payerName: prevState.payerName,
  };
};

export { getCashInfo, doPayment };
