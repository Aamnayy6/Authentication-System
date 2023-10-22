import React from "react";
function Header(){
    return <header>
         <div class="navbar">        
    <ul>
      <li >
        <a  href="/">Home</a>
      </li>
      <li >
        <a  href="/login">Login</a>
      </li>
      <li >
        <a  href="/register">Register</a>
      </li>
      <li>
        <a href="/myAccount">Account Details</a>
      </li>
    </ul>
    </div>
    </header>
};
export default Header;