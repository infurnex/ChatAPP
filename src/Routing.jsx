import React from 'react'
import {
    createBrowserRouter,
  } from "react-router-dom";
import Register from './Components/Register';
import Auth from './Components/Auth';
import Main from './Components/Main';
import Personal from './Pages/Personal';
import Group from './Pages/Group';
import ForgotPassword from './Components/forgot';


export const Routerr = (User) => {
    const AuthUser = JSON.parse(localStorage.getItem("User"));
    console.log(AuthUser)
    return createBrowserRouter([
        {
            path : "/",
            element : AuthUser ? <Main  User = {AuthUser}/> :  <Auth/>,
            children : [
                {
                    path : "/",
                    element : <Personal User={AuthUser}/>
                },
                {
                    path : 'group',
                    element : <Group User = {AuthUser}/>
                }
            ]
        },
        {
            path : "/Register",
            element : <Register/>
        },
        {
            path :  "/Login",
            element : <Auth/>
        },
        {
            path : "/forgot",
            element : <ForgotPassword/>
        }
    ])
}
