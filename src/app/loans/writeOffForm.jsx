"use client";
import Form from "next/form";
import React, { useActionState } from "react";
import { writeOff } from "./loanUtilities";

const WriteOffForm = (props) => {
  const initState = {
    authKey: props.authKey,
    name: props.name,
    loanId: props.loan,
  };
  const [state, formAction] = useActionState(writeOff, initState);
  return (
    <Form action={formAction}>
      <input type="submit" value="Write Off" className="button is-danger" />
    </Form>
  );
};

export { WriteOffForm };
