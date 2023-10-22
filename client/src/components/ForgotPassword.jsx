import React from "react";
import BoxForm from "./BoxForm";
const inputs=[
{
    id:1,
    type: "email",
     name: "email",
     placeholder: "Please enter your email",
}
];
async function submitResetPass(e) {

    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    const response = await fetch('/auth/send-reset-password-link', { method: "POST",  headers: {
      "Content-Type": "application/json",
    }, body: JSON.stringify(formJson) });
    const result = await response.json();
    console.log(result);
  }
function ForgotPassword(){
    return(
        <>
        <BoxForm
             heading = "Reset Password"
        buttonLabel = "Send Email"
        inputArray = {inputs}
        submit = {submitResetPass}
        
        />
    <p>An email will be sent to your account containing instructions on how you can update your password.</p>
    </>
    );
};
export default ForgotPassword;