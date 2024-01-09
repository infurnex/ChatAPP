import { Timestamp, addDoc, collection, doc } from 'firebase/firestore';
import React, { useState } from 'react'
import { db } from '../Config';
import data  from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

const inlineStyles = {
  textContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  text: {
    flex : 1,
    borderRadius: '3px',
    boxSizing: 'border-box',
    height: '2rem',
    backgroundColor: '#e2dbd1',
    fontFamily: "'Open Sans', sans-serif",
    fontSize: 'larger',
    fontWeight: '400',
  },
  messageButtons: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  voiceButton: {
    backgroundColor: '#743fa5',
    color: 'white',
    border: '1px solid #743fa5',
    borderRadius: '5px',
    padding: '8px',
    cursor: 'pointer',
    marginRight: '5px',
  },
  send: {
    background: 'transparent',
    border: '0',
    cursor: 'pointer',
    flex: '0 0 auto',
    marginLeft: '8px',
    marginRight: '8px',
    padding: '0',
    position: 'relative',
    outline: 'none',
  },
  sendCircle: {
    background: '#00aeff',
    borderRadius: '50%',
    color: '#fff',
    position: 'relative',
    width: '35px',
    height: '35px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendCircleIcon: {
    fontSize: '24px',
    marginLeft: '5px',
  },
  sendCircleIconActive: {
    animation: 'moveInOut 1s',
  },
};

export default function GroupMessage({groupID, senderID, senderDetails}) {
    const [message, setMessage] = useState();
    const [showEmoji, setShowEmoji] = useState(false);
    const handleNewMessage = async () => {
        try{
            const parentDocRef = doc(db, 'GroupConnection', groupID);
            const subDocRef = collection(parentDocRef, "Messages")
            const date = new Date()
            const result = await addDoc(
                subDocRef, {
                    message : message,
                    sender_id : senderID,
                    sender_name : senderDetails.user_name,
                    sender_email : senderDetails.user_email,
                    sender_avatar : senderDetails.user_avatar,
                    timeStamp : Timestamp.fromDate(date)
                }
            )
            console.log(result)
        }
        catch(e){
            throw e;
        }
    }
  return (
    <div id="text-container" style={{display: 'flex',alignItems: 'center',alignItems : "center", background : "white", margin : "0.5rem  2rem", padding :"0.3rem 1rem" , borderRadius : "1rem"}}>
        <input placeholder='Write something....' id="text" type="text" style={{flex : 1, padding : "0.5rem", border : "none", outline : "none"}} value={message} onChange={(e) => setMessage(e.target.value)}/>
        <div class="message-buttons" style={inlineStyles.messageButtons}>
          <svg style={{fill : "rgb(114, 79, 249)"}} xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M480-400q-50 0-85-35t-35-85v-240q0-50 35-85t85-35q50 0 85 35t35 85v240q0 50-35 85t-85 35Zm0-240Zm-40 520v-123q-104-14-172-93t-68-184h80q0 83 58.5 141.5T480-320q83 0 141.5-58.5T680-520h80q0 105-68 184t-172 93v123h-80Zm40-360q17 0 28.5-11.5T520-520v-240q0-17-11.5-28.5T480-800q-17 0-28.5 11.5T440-760v240q0 17 11.5 28.5T480-480Z"/></svg>
        </div>
        <div style={{position  :  "relative", cursor : "pointer", display :  "flex", alignItems : "center", justifyContent : "center"}} onMouseEnter={() => {setShowEmoji(true)}} onMouseLeave={() => setShowEmoji(false)}>
          <svg style={{fill : "rgb(114, 79, 249)"}} xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M480-480Zm0 400q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q43 0 83 8.5t77 24.5v90q-35-20-75.5-31.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160q133 0 226.5-93.5T800-480q0-32-6.5-62T776-600h86q9 29 13.5 58.5T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm320-600v-80h-80v-80h80v-80h80v80h80v80h-80v80h-80ZM620-520q25 0 42.5-17.5T680-580q0-25-17.5-42.5T620-640q-25 0-42.5 17.5T560-580q0 25 17.5 42.5T620-520Zm-280 0q25 0 42.5-17.5T400-580q0-25-17.5-42.5T340-640q-25 0-42.5 17.5T280-580q0 25 17.5 42.5T340-520Zm140 260q68 0 123.5-38.5T684-400H276q25 63 80.5 101.5T480-260Z"/></svg>
          {
            showEmoji  ? 
            <div style={{position : "absolute", bottom : 0, right : 0}}>
              <Picker data={data} onEmojiSelect={(data) => {console.log(data) ; setMessage((prev) => prev + data.native)}} />
            </div> : <></>
          }
          
        </div>
        <button class="send" style={inlineStyles.send} onClick={() => { 
          if(message.length){
            handleNewMessage()
          }
        }}>
          <div class="circle"  style={inlineStyles.sendCircle}>
            <svg style={{fill : "white"}}  xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z"/></svg> 
          </div>
        </button>
      </div>
  )
}
