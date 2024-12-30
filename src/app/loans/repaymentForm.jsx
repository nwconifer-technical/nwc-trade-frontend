"use client";
import Form from "next/form";
import React, { useActionState } from "react";
import { repayLoan } from "./loanUtilities";

export const RepaymentForm = (props) => {
  const initState = {
    authKey: props.authKey,
    nationName: props.name,
    loanId: props.loanId,
  };
  const [state, formAction] = useActionState(repayLoan, initState);
  console.log(state);
  return (
    <Form action={formAction}>
      <div className="field">
        <label htmlFor="loan" className="label">
          Loan Id
        </label>
        <input
          type="text"
          id="loanId"
          name="loan"
          value={props.loanId}
          disabled
          readOnly={true}
        />
      </div>
      <div className="field">
        <label htmlFor="repayValue" className="label">
          Repay Value
        </label>
        <input type="number" name="repayValue" id="repayValue" step={0.01} />
      </div>
      <div className="field">
        <input type="submit" value="Submit" className="button is-primary" />
      </div>
    </Form>
  );
};
