"use server";
const parseString = require("xml2js").parseString;
import { hash } from "bcrypt";
import { redirect } from "next/navigation";

const API_ROUTE = process.env.API_ADDRESS;
const NS_TOKEN = process.env.NS_TOKEN;

const doSignup = async (prevState, formData) => {
  const nationName = formData.get("nationName");
  const region = formData.get("regionName");
  const nsVerify = formData.get("nsVerify");
  const PasswordString = formData.get("password");
  const response = await fetch(
    `https://www.nationstates.net/cgi-bin/api.cgi?a=verify&nation=${nationName}&checksum=${nsVerify}&token=${NS_TOKEN}&q=region`
  );
  const received = await response.text();
  var appropriate;
  parseString(received, (_, result) => (appropriate = result.NATION));
  if (region == appropriate.REGION[0]) {
    if (appropriate.VERIFY[0] == "1") {
      const registerPackage = {
        NationName: nationName,
        PasswordString,
        RegionName: region,
      };
      const registerR = await fetch(`${API_ROUTE}/signup/nation`, {
        body: JSON.stringify(registerPackage),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (registerR.status == 201) {
        return redirect("/access/login");
      } else if (registerR.status == 409) {
        return { statusMessage: "You are already registered" };
      } else {
        return { statusMessage: "Server Error" };
      }
    } else {
      return { statusMessage: "Nation Not Verified" };
    }
  } else {
    return { statusMessage: "Incorrect Region" };
  }
};

export default doSignup;
