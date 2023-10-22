import React from "react";
import { useState, useEffect } from "react";
import QRCode from "qrcode";
const boxStyles = {
    "backgroundColor": "#f5f6f5",
    "boxShadow": "10px 5px 5px #e6e6e6",
    "borderRadius": "5px",
    "textAlign": "center",
    "width": "300px",
    "height": "400px",
    "position": "absolute",
    "top": "0",
    "bottom": "0",
    "left": "0",
    "right": "0",
    "margin": "auto",
};

function TwoFactorAuth(props){
    
    const [qrcode, setQrcode] = useState("");
    const [token, setToken] = useState("");
    useEffect(() => {
      QRCode.toDataURL(props.secret.qrcode).then(setQrcode);
    }, []);

    async function setupMfa(e){
        e.preventDefault();
        const data = {
            email:"aamnaozair16@gmail.com",
            token: token
        }
        const response = await fetch("/otp/auth/verify-setup", { method: "POST",  headers: {
            "Content-Type": "application/json",
          }, body: JSON.stringify(data) });
          console.log(response);
          const result = await response.json();
          console.log(result);
          if(result.status=="success"){
            props.closePopUp();
          }
    };

    return(
        <div style={boxStyles}>
        <h3>Two-Factor Authentication (2FA)</h3>
        <div className="p-6 space-y-4">
          <h4>
            Configuring Google Authenticator or Authy
          </h4>
          <div >
            <li>
              Install Google Authenticator (IOS - Android) or Authy (IOS -
              Android).
            </li>
            <li>In the authenticator app, select "+" icon.</li>
            <li>
              Select "Scan a barcode (or QR code)" and use the phone's camera
              to scan this barcode.
            </li>
          </div>
          <div>
            <h4>Scan QR Code</h4>
            <div className="flex justify-center">
              <img
                className="block w-64 h-64 object-contain"
                src={qrcode}
                alt="qrcode url"
              />
            </div>
          </div>
          <div>
            <h4 >Or Enter Code Into Your App</h4>
            <p className="text-sm">SecretKey: {props.secret.secret} (Base32 encoded)</p>
          </div>
          <div>
            <h4 >Verify Code</h4>
            <p className="text-sm">
              For changing the setting, please verify the authentication code:
            </p>
          </div>
          <form onSubmit={setupMfa}>
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/4 p-2.5"
                placeholder="Authentication Code"
                value={token}
               onChange={(e)=>setToken(e.target.value)}
              />
              <div>
                <button
                  type="button"
                  onClick={props.closePopUp}
        
                >
                  Close
                </button>
                <button type="submit" >
                  Verify & Activate
                </button>
              </div>
            </form>
        </div>




        </div>
        );
};
export default TwoFactorAuth;