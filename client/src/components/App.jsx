import React from "react";
import Header from "./Header";
import Register from "./Register";
import Home from "./Home";
import Login from "./Login";
import AccountInfo from "./AccountInfo";
import UpdatePassword from "./UpdatePassword";
import ForgotPassword from "./ForgotPassword";
import AccountVerified from "./AccountVerified";
import ValidateOtp from "./ValidateOtp";
import {
    createBrowserRouter,
    Route,
    Routes,
    RouterProvider,
  } from "react-router-dom";
  
  const router = createBrowserRouter([
    {
      path:"/",
      element: <Home/>
    },
    {
      path:"/register",
      element: <Register/>
    },
    {
      path: "/login",
      element: <Login/>,
    },
    {
      path: "/myAccount",
      element: <AccountInfo/>
    },
    {
      path: "/auth/update-password",
      element: <UpdatePassword/>
    },
    {
      path: "/forgot-password",
      element: <ForgotPassword/>
    },
    {
      path:"/account-verified",
      element: <AccountVerified/>
    },
    {
      path: "/validate-otp",
      element: <ValidateOtp/>
    }
   ]);
function App(){
    return <div>
    <Header/>
    <RouterProvider router={router} />
    </div>
}
export default App;