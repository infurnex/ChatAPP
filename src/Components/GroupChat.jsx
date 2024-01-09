
import { collection, doc, limit, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useRef } from 'react'
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../Config';
import Loader from './Loader';

export default function GroupChat({GroupID, senderID}) {
  const parentDocRef = doc(db, "GroupConnection", GroupID);
  const chatRef = collection(parentDocRef, "Messages");
  const [value, loading] = useCollection(
    query(chatRef, orderBy("timeStamp", "desc"), limit(50))
  ) 
  if(loading){
    return(
      <div style={{flex : 9, position : "relative", display : "flex", justifyContent : "center", alignItems : "center"}}>
        <Loader/>
      </div>
    )
  }
  return (
    <Chats value={value} senderID={senderID}/>
  )
}

const Chats = ({value, senderID}) => {
  const containerRef = useRef();
  useEffect(() => {
    const scrollToLastParagraph = () => {
      if (containerRef.current) {
        const childDiv = containerRef.current;
        childDiv.scrollTop = childDiv.scrollHeight;
      }
    };
    scrollToLastParagraph();
  }, []);
  return(
    <div style={{flex : 9, position : "relative"}}>
      <div ref={containerRef} style={{ position : "absolute", top : 0, left : 0, right : 0, bottom : 0, overflowY : "auto"}} className='custom-scrollbar'>
      <div style={{padding : "1.5rem", display : "flex", flexDirection : 'column'}}> 
        {
          value?.docs.reverse().map( (doc) => {
            const data = doc.data();
            const date = new Date(data.timeStamp.seconds*1000)
            const Time = date.toLocaleTimeString([],{timeStyle : 'short'});
            if(data.sender_id === senderID){
              return(
                <div style= {{textAlign : "right" , padding : "0.2rem"}}>
                  <div style={{fontSize : "10px"}}>
                    me
                  </div>
                  <div style={{display : "block", background : "rgb(114, 79, 249)" , color : "white"  , padding : "0.5rem 1rem", borderRadius : "8px" , borderBottomRightRadius : "0", display : "inline-block"}}> 
                    {data.message}
                  </div>
                  <div style={{fontSize : "10px"}}>
                    {Time}
                  </div>
                </div>
              )
            }
            else{
              return(
              <div style={{textAlign : "left" , padding : "0.2rem", display :  "flex", alignItems :  "center"}}>
                <div>
                  <img style={{height : "2rem",  margin : "5px"}} src = {data.sender_avatar}/>
                </div>
                <div>
                  <div style={{fontSize : "10px", color : "gray", fontWeight :  "bold", marginLeft : "3px", fontStyle : "italic"}}>
                    {data.sender_name}
                  </div>
                  <div style={{ display : "block", background : "rgb(233 227 255)" , color : "black"  , padding : "0.5rem 1rem", borderRadius : "8px" , borderBottomLeftRadius : "0", display : "inline-block"}}> 
                    {data.message}
                  </div>
                  <div style={{fontSize : "10px"}}>
                    {Time}
                  </div>
                </div>
              </div>
              )
            }
          })
        }           
        </div>
      </div>
    </div>
  )
}
