"use client";
import react from "react";
import { useState, useActionState } from "react";
import Form from "next/form";
import doLogin from "./doLogin";

const initialState = {
  statusMessage: "",
};

const Login = () => {
  const [state, formAction] = useActionState(doLogin, initialState);
  return (
    <div className="container" style={{ width: "33%" }}>
      {state.statusMessage ? (
        <div className="message is-danger">
          <div className="message-header">{state.statusMessage}</div>
        </div>
      ) : (
        ""
      )}
      <div className="box">
        <h1>Login Here!</h1>
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
            <button type="submit" className="button is-success" required>
              Submit
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
