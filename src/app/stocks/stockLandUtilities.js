"use server";

const API_ROUTE = process.env.API_ADDRESS;

export const getAllEquities = async () => {
  const cashRequ = await fetch(`${API_ROUTE}/shares/quote`);
  const theCashJson = await cashRequ.json();
  return theCashJson;
};

export const getAStock = async (shareTicker) => {
  const cashRequ = await fetch(`${API_ROUTE}/shares/book/${shareTicker}`);
  if (cashRequ.status == 404) {
    return null;
  }
  const theCashJson = await cashRequ.json();
  return theCashJson;
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
  if (!tradeSend.ok) {
    if (tradeSend.status == 404) {
      return {
        good: false,
        statusMessage: `Stock does not exist`,
        authKey: prevState.authKey,
        traderName: prevState.traderName,
        acctName: prevState.acctName,
        ticker: prevState.props,
      };
    } else if (tradeSend.status == 403) {
      return {
        good: false,
        statusMessage: `Not authorised to trade through this account`,
        authKey: prevState.authKey,
        traderName: prevState.traderName,
        acctName: prevState.acctName,
        ticker: prevState.props,
      };
    } else {
      return {
        good: false,
        statusMessage: `Server Error`,
        authKey: prevState.authKey,
        traderName: prevState.traderName,
        acctName: prevState.acctName,
        ticker: prevState.props,
      };
    }
  }
  if (tradeSend.bodyUsed) {
    const theJs = await tradeSend.json();
    console.log(theJs);
    if (theJs.tradeId) {
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
