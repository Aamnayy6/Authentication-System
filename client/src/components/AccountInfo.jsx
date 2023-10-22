import React from "react";
import { useState } from "react";
import TwoFactorAuth from "./TwoFactorAuth";

function AccountInfo(){
    const [displayPopUp, setDisplayPopUp] = useState(false);
    const [secret, setSecret] = useState({
        qrcode: "",
        secret: "",
      });
      async function generateQRcode(){
        const data={
            email: "aamnaozair16@gmail.com"
        }
        const response = await fetch("/otp/auth/generate", { method: "POST",  headers: {
            "Content-Type": "application/json",
          }, body: JSON.stringify(data) });
          const result = await response.json();
          setDisplayPopUp(true);
          setSecret({
            qrcode: result.qrcode,
            secret: result.secret
          });
    }
    return (
        <>
        <h1 class="heading"> Account Details </h1>

        <div >
        {/* <% if (locals.user) { %> */}
               <h2> Hi user.userName</h2>
               <p>Your email: user.email</p>   
            
        {/* <% } %> */}
        
        <button onClick={generateQRcode}>Setup 2FA </button>
        <a href="/auth/logout"> <button type="submit"  >Log Out</button></a>
        {displayPopUp &&
        <TwoFactorAuth
        secret={secret}
        closePopUp = {()=>setDisplayPopUp(false)}
        />}
        </div>
        </>
    );
};
export default AccountInfo;