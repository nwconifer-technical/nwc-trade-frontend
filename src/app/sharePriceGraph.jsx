"use server";
import react from "react";
import { LineChart } from "@mui/x-charts";
import { getPriceHistory } from "./stocks/stockLandUtilities";

export const SharePriceGraph = async (props) => {
  const shareTicker = props.ticker;
  const livePrice = props.curPrice;
  const theHistory = (await getPriceHistory(shareTicker)).RecentPrice;
  const usableHistory = theHistory.map((historyThing) => ({
    Timecode: new Date(historyThing.Timecode),
    LogPrice: historyThing.LogPrice,
  }));
  usableHistory.push({
    Timecode: new Date(),
    LogPrice: livePrice,
  });
  return (
    <LineChart
      margin={{ top: 50, right: 20, left: 50 }}
      xAxis={[
        {
          id: "timeP",
          scaleType: "time",
          dataKey: "Timecode",
          label: "Time",
        },
      ]}
      series={[
        {
          dataKey: "LogPrice",
          label: "Share Price",
          curve: "linear",
          showMark: false,
        },
      ]}
      yAxis={[
        {
          id: "shPrice",
          scaleType: "linear",
          //   label: "Share Price",
        },
      ]}
      bottomAxis={"timeP"}
      leftAxis={"shPrice"}
      dataset={usableHistory}
      height={250}
      width={675}
      slotProps={{
        legend: {
          hidden: true,
        },
      }}
      grid={{ vertical: true, horizontal: true }}
    />
  );
};
