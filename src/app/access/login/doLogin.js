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
  if (reqRet.status == 404) {
    return { statusMessage: "No such registered user" };
  } else if (reqRet.status == 403) {
    return { statusMessage: "Incorrect password" };
  } else if (reqRet.status != 200) {
    return { statusMessage: "Server issue" };
  }
  const reqBod = await reqRet.json();
  const cookieStore = await cookies();
  const sessionThing = await encrypt({
    nationName,
    authToken: toString(reqBod.AuthKey),
    region: reqBod.UserRegion,
    name: reqBod.UserName,
    permssion: reqBod.UserPermission,
  });
  cookieStore.set({
    name: "session",
    value: sessionThing,
    secure: true,
    path: "/",
    maxAge: 7 * (60 * 60 * 24),
  });
  return redirect(`/account`);
};

export default doSignup;
