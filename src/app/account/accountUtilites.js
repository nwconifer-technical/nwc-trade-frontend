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
  const sender = formData.get("payer");
  const receiver = formData.get("payeeName");
  const value = formData.get("value");
  const message = formData.get("message")
    ? formData.get("message")
    : "Cash Transfer";
  const reqRet = await fetch(`${API_ROUTE}/cash/transaction`, {
    method: "post",
    body: JSON.stringify({
      sender,
      receiver,
      value,
      message,
    }),
  });
  if (reqRet.status == 404) {
    return {
      statusMessage: {
        good: false,
        message: "Payee does not exist",
      },
    };
  }
  if (reqRet.status == 500) {
    return {
      statusMessage: {
        good: false,
        message: "Server Error",
      },
    };
  }
  return {
    statusMessage: {
      good: true,
      message: "Transfer Successful",
    },
  };
};

export { getCashInfo, doPayment };
