"use server";

const API_ROUTE = process.env.NEXT_PUBLIC_API_ADDRESS;

export const getAllEquities = async () => {
  const cashRequ = await fetch(`${API_ROUTE}/shares/quote`);
  if (cashRequ.status != 200) {
    return false;
  }
  const theCashJson = await cashRequ.json();
  return theCashJson;
};

export const getAStock = async (shareTicker) => {
  const cashRequ = await fetch(`${API_ROUTE}/shares/book/${shareTicker}`);
  if (cashRequ.status != 200) {
    return null;
  }
  return await cashRequ.json();
};

export const getPriceHistory = async (ticker) => {
  const pricesRequ = await fetch(`${API_ROUTE}/shares/recentprices/${ticker}`);
  if (pricesRequ.status == 404) {
    return {
      RecentPrice: [],
    };
  }
  return await pricesRequ.json();
};

// type tradeFormat struct {
// 	TradeId   string
// 	Ticker    string
// 	Sender    string
// 	Direction string
// 	Quantity  int
// 	PriceType string
// 	Price     float32
// }

export const transferShares = async (prevState, formData) => {
  const trader = prevState.traderName;
  const ticker = formData.get("ticker");
  const sender = prevState.acctName;
  const receiver = formData.get("receiver");
  const quantity = formData.get("quantity");
  const reqBod = JSON.stringify({
    ticker,
    sender,
    receiver,
    quantity,
    quantity: Number(quantity),
    AvgPrice: Number(0),
  });
  const transferSend = await fetch(`${API_ROUTE}/shares/transfer`, {
    method: "POST",
    body: reqBod,
    headers: {
      AuthKey: prevState.authKey,
      NationName: prevState.traderName,
    },
  });
  if (transferSend.status == 404) {
    return {
      good: false,
      statusMessage: `You have no shares of this to transfer`,
      authKey: prevState.authKey,
      traderName: prevState.traderName,
      acctName: prevState.acctName,
    };
  } else if (transferSend.status == 500) {
    return {
      good: false,
      statusMessage: `Server Error`,
      authKey: prevState.authKey,
      traderName: prevState.traderName,
      acctName: prevState.acctName,
    };
  } else {
    return {
      good: true,
      statusMessage: `Shares transferred`,
      authKey: prevState.authKey,
      traderName: prevState.traderName,
      acctName: prevState.acctName,
    };
  }
};

export const sendTrade = async (prevState, formData) => {
  const trader = prevState.traderName;
  const ticker = formData.get("ticker") || prevState.ticker;
  const sender = prevState.acctName;
  const direction = formData.get("direction");
  const quantity = formData.get("quantity");
  const priceType = formData.get("priceType");
  const price = formData.get("price");
  const reqBod = JSON.stringify({
    ticker,
    sender,
    direction,
    quantity: Number(quantity),
    priceType,
    price: Number(price),
  });
  const tradeSend = await fetch(`${API_ROUTE}/shares/trade`, {
    method: "post",
    body: reqBod,
    headers: {
      AuthKey: prevState.authKey,
      NationName: prevState.traderName,
    },
  });
  console.log(tradeSend.status);
  if (tradeSend.status == 404) {
    return {
      good: false,
      statusMessage: `Stock does not exist`,
      authKey: prevState.authKey,
      traderName: prevState.traderName,
      acctName: prevState.acctName,
      ticker: prevState.props,
    };
  } else if (tradeSend.status == 401) {
    return {
      good: false,
      statusMessage: `Not authorised to execute this trade`,
      authKey: prevState.authKey,
      traderName: prevState.traderName,
      acctName: prevState.acctName,
      ticker: prevState.props,
    };
  } else if (tradeSend.status == 500) {
    return {
      good: false,
      statusMessage: `Server Error`,
      authKey: prevState.authKey,
      traderName: prevState.traderName,
      acctName: prevState.acctName,
      ticker: prevState.props,
    };
  }
  if (tradeSend.status == 201) {
    const theJs = await tradeSend.json();
    return {
      good: true,
      statusMessage: `New Trade opened with id ${theJs.TradeId}`,
      ...prevState,
    };
  }
  return {
    good: true,
    statusMessage: `Trade Opened and Filled`,
    authKey: prevState.authKey,
    traderName: prevState.traderName,
    acctName: prevState.acctName,
    ticker: prevState.props,
  };
};
