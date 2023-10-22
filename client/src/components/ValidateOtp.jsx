import React from "react";
import BoxForm from "./BoxForm";
const inputs=[
    {
      id:1,
      type: "text",
       name: "token",
       placeholder: "Please enter your code",
    },
];
async function submitOtp(e){
    e.preventDefault();
    const data={
        email:"aamnaozair16@gmail.com",
        token: e.target.token.value
    }
    const response = await fetch("/otp/auth/validate", { method: "POST",  headers: {
        "Content-Type": "application/json",
      }, body: JSON.stringify(data) });
      console.log(response);
      const result =await  response.json();
      console.log(result);
}
function ValidateOtp(){
    return(
        <div>
        <p>Open the two-step verification device on your mobile to get your verification code</p>
        <BoxForm
          heading= "Two-Factor Authentication"
          
      buttonLabel = "Authenticate"
        inputArray = {inputs}
        submit = {submitOtp}
        />
        </div>
    );
};
export default ValidateOtp;