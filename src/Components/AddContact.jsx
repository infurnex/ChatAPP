import { addDoc, arrayUnion, collection, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import React, { useState } from 'react'
import { auth, db } from '../Config';

export default function AddContact({ID}) {
    const [isOpen, setIsOpen] = useState(false);
  return (
    <div style={{display : "flex", justifyContent : "center", padding : "5px"}}>
        <div class="addbuttonb">
            <button onClick={() => setIsOpen(true)}>
                Add Contacts
            </button>
        </div>
        {
            isOpen && <Modal setIsOpen={setIsOpen} ID = {ID}/>
        }
    </div>
  )
}

const Modal = ({setIsOpen ,ID}) => {
    const [email, setEmail] = useState('');
    const [found, setFound] = useState('');
    const [foundID, setFoundID] = useState("");
    const SearchUser = async (Email) => {
        try{
            const result = await getDocs(
                query(
                    collection(db, "Users"),
                    where("user_email" , "==", Email)
                )
            )
            if(result.docs.length){
                console.log(result.docs[0].data());
                setFound(result.docs[0].data())
                setFoundID(result.docs[0].id)
            }
        }
        catch(e){
            throw e;
        }
    }

    const UpdateUsers = async (userID, Update) => {
        try{
            await updateDoc(
                doc(collection(db, "Users"), userID),
                Update
            )
        }
        catch(e){
            throw e;
        }
    }
    const AddnewConnection = async () => {
        try{
            console.log(ID, foundID)
            const result = await addDoc(
                collection(db, "Connections"), {
                    users : [ID, foundID]
                }
            )
            await UpdateUsers(ID, {
                connections : arrayUnion(
                    {
                        connection_id : result.id,
                        accepted : true,
                        initiator : true
                    }
                )
            })
            await UpdateUsers(foundID , {
                connections : arrayUnion(
                    {
                        connection_id : result.id,
                        accepted : null,
                        initiator :  false
                    }
                )
            })
            window.location.reload()
        }
        catch(e){
            throw e
        }
    }
    return (
        <div style={{ position : "absolute" , top : 0 , left : 0 , right : 0 , bottom : 0, backdropFilter : "blur(2px)" , zIndex : "2", display : "flex", justifyContent : "center", alignItems: "center"}}>
            <div style={{ background : "rgb(237, 233, 253)" , padding : "1rem"}}>
                <div style={{ fontSize : "12px", color : "rgb(114, 79, 249)" }}>
                    Search Contact
                </div>
                <div >
                    <input style  = {{padding : "0.2rem" , margin : "1rem", width : "15rem" }} placeHolder = {"...Username or Email"} onChange={async (e) => await SearchUser(e.target.value)}></input>
                </div>
                {
                    found &&
                    <div style={{display : "flex", justifyContent : "center", alignItems :  "center", margin :  "0.5rem"}}>
                        <img src={found.user_avatar} style={{height  : "2.5rem"}}></img>
                        <div>
                            <div style={{fontSize : "10px"}}>
                                {found.user_name}
                            </div>
                            <div>
                                {found.user_email}
                            </div>
                        </div>
                    </div>
                }
                <div style={{display  :  "flex", justifyContent  :  "center", alignItems : "center"}}>
                    {
                        found ? 
                        <button style={{ margin : "0.5rem", padding : "0.4rem", color : 'white', background : "green", border : "none"}} onClick={async (e) => await AddnewConnection()}>Request</button>
                        :
                        <button disabled style={{ margin : "0.5rem", padding : "0.4rem", color : 'white', background : "green", border : "none"}}>Request</button>
                    }
                    <button style={{margin : "0.5rem", padding : "0.4rem", color : 'black', background : "", border : "none"}} onClick={() => setIsOpen(false)}>Close</button>
                </div>
            </div>
        </div>
    )
}