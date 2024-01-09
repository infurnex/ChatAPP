import React, { useState } from 'react'
import Contacts from '../Components/Contacts'
import AddContact from '../Components/AddContact'
import Chat from '../Components/Chat'
import Message from '../Components/Message'

export default function Personal({User}) {
    const [selectUser, setSelectUser] = useState();
  return (
    <div style={{display : 'flex', flex : 1, width : "85vw"}}>
        <div style={{flex : 1 , height : "100%" , display : "flex" , flexDirection : "column" , background : "#ede9fd"}}>
            <Contacts ID={User.UserID} setSelectUser = {setSelectUser} selectUser = {selectUser}/>
            <AddContact ID = {User.UserID}/>
        </div>
        <div style={{flex : 3 , display : "flex", flexDirection : "column"}}>
            { selectUser ? 
                <>
                <Chat senderID={User.UserID} connectionID={selectUser.connectionID} connectionDetail = {selectUser.user}/> 
                <Message selectUser={selectUser} connectionID={selectUser.connectionID} senderID = {User.UserID}/>
                </>
            : <div style={{ textAlign : "center", margin : "5rem 0",fontSize : "1.5rem" , color : "gray"}}> Select chat</div>}
        </div>
    </div>
  )
}
