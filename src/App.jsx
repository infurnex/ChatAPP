import './App.css'
import { auth } from './Config.js'
import { signOut } from 'firebase/auth'
import {
  RouterProvider,
} from "react-router-dom";
import { Routerr } from './Routing.jsx'

const logout = () => {
  signOut(auth)
};

function App() {
  return (
    <div style={{width : "85vw", background : "#f4f4fa", height : "100vh", position : "relative",  boxSizing   : "border-box", padding : "5px", margin : "0 auto", boxShadow : "2px  2px 100px rgba(0, 0, 0, 0.2)"}}>
    <RouterProvider router={Routerr()}/>
    </div>
  )
}

export default App
