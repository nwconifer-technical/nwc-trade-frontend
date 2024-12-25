"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const signout = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("session");
  redirect("/");
};
export default signout;
