import React from "react";
import BoxForm from "./BoxForm";
const inputs=[
  {
    id:1,
    type: "email",
     name: "email",
     placeholder: "Please enter your email",
  },
  {
    id:2,
    type: "password",
     name: "password",
     placeholder: "Please enter your password",
  },
  {
    id:3,
    type: "text",
     name: "userName",
     placeholder: "Please enter your user name",
  },
];

async function submitRegister(e) {

  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);
  const formJson = Object.fromEntries(formData.entries());
  const response = await fetch('/auth/register', { method: "POST",  headers: {
    "Content-Type": "application/json",
  }, body: JSON.stringify(formJson) });
  const result = await response.json();
  console.log(result);
}
function Register(){
    return (
      <BoxForm
        heading = "Register"
        buttonLabel = "Register"
        inputArray = {inputs}
        submit = {submitRegister}
        
      />
    );
  
};
export default Register;

