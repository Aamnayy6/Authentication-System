import React from "react";
function UnAuthorizedAccess(){
    return <div class="message-container">
    <h2 class="message-heading">Oops! Restricted Access</h2>
    <p class="message-text">Please login or register to access this page.</p>
    <div class="button-container">
        <a href="/login"><button  class="button login-button">Login</button></a>
       <a href="/register" ><button class="button register-button">Register</button></a> 
    </div>
    </div>
};
export default UnAuthorizedAccess;