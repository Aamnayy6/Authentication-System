import React from "react";
import BoxForm from "./BoxForm";
import { useNavigate } from "react-router-dom";
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
];

function Login(){
  const navigate = useNavigate();
  async function submitLogin(e) {

    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    const response = await fetch('/auth/login', { method: "POST",  headers: {
      "Content-Type": "application/json",
    }, body: JSON.stringify(formJson) });
    const result = await response.json();
    if(result.data.user.is2faEnabled===true){
      navigate("/validate-otp");
    }
    else{
      navigate("/myAccount");
    }
  };
    return (
      <BoxForm
      heading= "Login"
      buttonLabel = "Login"
        inputArray = {inputs}
        link={{ url: "/forgot-password", label: "Forgot Password?" }}
        submit = {submitLogin}
        />

        );
};
export default Login;