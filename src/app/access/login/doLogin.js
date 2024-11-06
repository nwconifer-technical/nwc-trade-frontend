"use server";
import { hash } from "bcrypt";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { encrypt } from "@/app/cookieUtilities";

const API_ROUTE = process.env.API_ADDRESS;

const doSignup = async (prevState, formData) => {
  const nationName = formData.get("nationName");
  const passWord = formData.get("password");
  const reqRet = await fetch(`${API_ROUTE}/verify/nation`, {
    method: "POST",
    body: JSON.stringify({
      nationName,
      PasswordString: passWord,
    }),
  });
  console.log(reqRet);
  if (reqRet.status == 404) {
    return { statusMessage: "No such registered user" };
  } else if (reqRet.status == 403) {
    return { statusMessage: "Incorrect password" };
  } else if (reqRet.status != 200) {
    return { statusMessage: "Server issue" };
  }
  console.log(reqRet.status);
  const reqBod = await reqRet.json();
  console.log(reqRet);
  const cookieStore = await cookies();
  const sessionThing = await encrypt({
    nationName,
    authToken: reqBod.AuthKey,
    region: reqBod.UserRegion,
    name: reqBod.UserName,
  });
  cookieStore.set({
    name: "session",
    value: sessionThing,
    secure: true,
    path: "/",
    maxAge: 7 * (60 * 60 * 24),
  });
  return redirect(`/`);
};

export default doSignup;
