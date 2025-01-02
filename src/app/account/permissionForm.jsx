"use client";
import react, { useActionState } from "react";
import Form from "next/form";

const API_ROUTE = process.env.NEXT_PUBLIC_API_ADDRESS;

export const updPerm = async (prevState, formData) => {
  const ret = await fetch(`${API_ROUTE}/nation/permission`, {
    method: "POST",
    headers: {
      NationName: prevState.name,
      AuthKey: prevState.AuthKey,
    },
    body: {
      NationName: formData.nationToUpdate,
      NewPermission: formData.newPerm,
    },
  });
  console.log(ret.status);
  if (ret.status == 403) {
    return {
      statusMessage: "You are not authorised to update these permissions",
      good: false,
      name: prevState.name,
      AuthKey: prevState.authKey,
    };
  }
  if (ret.status == 404) {
    return {
      statusMessage: "Nation does not exist",
      good: false,
      name: prevState.name,
      AuthKey: prevState.authKey,
    };
  }
  if (ret.status == 200) {
    return {
      statusMessage: "Permission updated",
      good: true,
      name: prevState.name,
      AuthKey: prevState.authKey,
    };
  } else {
    return {
      message: "Server Error",
      good: false,
      name: prevState.name,
      AuthKey: prevState.authKey,
    };
  }
};

export const PermissionEdit = (props) => {
  const [state, formAction] = useActionState(updPerm, {
    good: false,
    statusMessage: "",
    name: props.nationName,
    AuthKey: props.authKey,
  });
  return (
    <Form className="box" action={formAction}>
      {state.statusMessage ? (
        <div className={`message ${state.good ? `is-success` : `is-danger`}`}>
          <div className="message-header">{state.statusMessage}</div>
        </div>
      ) : (
        ""
      )}
      <h1 className="subtitle is-5">Region Permission Update</h1>
      <div className="field">
        <label htmlFor="nationToUpdate" className="label">
          Nation To Update
        </label>
        <input type="text" name="nationToUpdate" id="nationToUpdate" />
      </div>
      <div className="field">
        <label htmlFor="newPerm" className="label">
          New Permission
        </label>
        <select name="newPerm" id="newPerm" className="select">
          <option value="citizen" defaultChecked>
            Citizen
          </option>
          <option value="trader">Trader</option>
        </select>
      </div>
      <div className="field">
        <input type="submit" value="Submit" className="button is-primary" />
      </div>
    </Form>
  );
};
