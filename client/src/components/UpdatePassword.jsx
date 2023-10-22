import React from "react";
import BoxForm from "./BoxForm";
const inputs=[
  {
    id:1,
    type: "password",
     name: "password",
     placeholder: "Please enter your password",
  },
  {
    id:1,
    type: "password",
     name: "password",
     placeholder: "Re-enter your password",
  },
];


async function submitUpdatePass(e) {

  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);
  const formJson = Object.fromEntries(formData.entries());
  const token = new URLSearchParams(window.location.search).get('token');
  const url = `/auth/update-password?token=${token}`;
  const response = await fetch(url, { method: "POST",  headers: {
    "Content-Type": "application/json",
  }, body: JSON.stringify(formJson) });
  const result = await response.json();
  console.log(result);
}
function UpdatePassword(){
    return (
      <BoxForm
          heading= "Update Password"
      buttonLabel = "Update Password"
        inputArray = {inputs}
        submit = {submitUpdatePass}

      />
        );
      
};
export default UpdatePassword;