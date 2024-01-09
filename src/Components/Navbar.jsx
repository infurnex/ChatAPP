import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Profile from './profile';
import { signOut } from 'firebase/auth';
import { auth } from '../Config';

export default function Navbar({UserID,UserDetail}) {
  const navigate= useNavigate();
  const [state, setState] = useState("personal");
  const [showProfile, setShowProfile] = useState(false);

  const logOut = async () => {
    await signOut(auth)
    localStorage.removeItem("User");
    window.location.reload()
  }
    const inlineStyles = {
        navbar: {
          display: 'flex',
          justifyContent: 'space-between'
        },
        navbarButtons: {
          display: 'flex',
          alignItems: 'center',
        },
        navbarButton: {
          cursor: 'pointer',
          margin: '0 15px',
          padding: '10px',
          color: 'white',
          fontWeight: 'bold',
        },
        navbarLogo: {
          color: 'white',
          fontSize: '24px',
          textDecoration: 'none',
          textAlign: 'left',
          alignSelf: 'center',
          marginLeft: '25px',
        },
        userProfilePicture: {
          width: '30px',
          height: '30px',
          borderRadius: '50%',
          marginRight: '10px',
          alignSelf: 'center',
        },
    };
    return(
        <div style={
          {display : "flex", margin : "1px 0", alignItems : "center"}
        }>
            <div  onMouseLeave={() => setShowProfile(false)} style={{position : "relative",flex : 1, width :"100%", margin : "2px 0" , padding  : "5px 0",  background : "#ede9fd", fontWeight : "bold"}}>
              <div style={{display  : "flex", justifyContent : "space-between", alignItems : "center"}}>
                <div style={{display  : "flex", justifyContent : "space-between", alignItems : "center"}}>
                  <img onMouseEnter={() => setShowProfile(true)} id="userProfilePicture" style={
                    {
                      borderRadius : "100px",
                      margin : "0 5px",
                      height :  "2.5rem"
                    }
                  } src={UserDetail.user_avatar} alt="User Profile Picture"/>
                  <div>
                    <div>
                      {UserDetail.user_name}
                    </div>
                    <div style={{fontSize : "10px", fontWeight : "normal"}}>
                      {UserDetail.user_email}
                    </div>
                  </div>
                </div>
                <svg style={{margin : "0 0.5rem"}} xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z"  onClick={() => logOut()}/></svg>
              </div>
              <div style={{position :  "absolute", zIndex : 10  ,  top : "3rem"}}>
                {
                  showProfile ? 
                  <Profile UserID=  {UserID} UserDetail={UserDetail}/> : ""
                }
              </div>
            </div>
            <div class="navbar-buttons" style={{flex :  3 , display : "flex", justifyContent :  "center", alignItems :  "center", color : "black"}}>
              <div style={{boxShadow : "0  2px 10px rgba(0, 0, 0, 0.2)", borderRadius : "5px", display : "flex", justifyContent :  "center", alignItems :  "center"}}>
                <Link to = "/" style={{textDecoration : "none"}} onClick={() => setState("personal")}>
                  <div style={{background : state ==  "personal"  ? "#724ff9" : "", color : state == "personal" ? "white" : "" ,padding :  "5px", fontSize  : "14px", borderRadius : "5px"}}>Personal</div>
                </Link>
                <Link to = "/group" style={{textDecoration : "none"}} onClick={() => setState("groups")}>
                  <div style={{background : state ==  "groups"  ? "#724ff9" : "", color : state == "groups" ? "white" : "" ,padding :  "5px", fontSize  : "14px", borderRadius : "5px"}}>Groups</div>
                </Link>
              </div>
            </div>
        </div>
    )
}
