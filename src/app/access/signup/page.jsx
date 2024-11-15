"use client";
import react from "react";
import { useState, useActionState } from "react";
import Form from "next/form";
import Link from "next/link";
import doSignup from "./doSignup";

const initialState = {
  statusMessage: "",
};

const Signup = () => {
  const [state, formAction] = useActionState(doSignup, initialState);
  return (
    <div className="container" style={{ width: "33%" }}>
      {state.statusMessage ? (
        <div className="message is-danger">
          <div className="message-header">{state.statusMessage}</div>
        </div>
      ) : (
        ""
      )}
      <div className="box is-centered">
        <h1>Signup Form</h1>
        <h3>
          <i>Please ensure all information entered is correct</i>
        </h3>
        <p>
          For &quot;NS Code&quot;, please go to{" "}
          <Link
            href={`https://www.nationstates.net/page=verify_login?token=${process.env.NEXT_PUBLIC_NS_TOKEN}`}
            target="_blank"
          >
            Nationstates Verify
          </Link>
          , copy the code to your clipboard and paste it below .
        </p>
        <br />
        <Form action={formAction}>
          <div className="field">
            <label className="label" htmlFor="nationName">
              Nation Name
            </label>
            <input type="text" name="nationName" id="nationName" required />
          </div>
          <div className="field">
            <label className="label" htmlFor="password">
              Password
            </label>
            <input type="password" name="password" id="password" required />
          </div>
          <div className="field">
            <label className="label" htmlFor="nsVerify">
              NS Code
            </label>
            <input type="text" name="nsVerify" id="nsVerify" required />
          </div>
          <div className="field">
            <button type="submit" className="button is-success" required>
              Submit
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Signup;
