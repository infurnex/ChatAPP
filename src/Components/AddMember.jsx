import React, { useState } from 'react'
import { arrayUnion, collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { db } from '../Config';

export default function AddMember({groupID}) {
    const [isOpen, setIsOpen] = useState(false);
    return(
    <div>
    <button style={{padding : "5px 10px", borderRadius  :  "3px", margin : "0", background : "rgb(0 220 150)", color : "white", border : "none",boxShadow : "0  2px 10px rgba(0, 0, 0, 0.2)"}} onClick={() => {setIsOpen(true)}}>
        Add
    </button>
    {
        isOpen &&
        <Modal setIsOpen={setIsOpen} groupID={groupID}/>
    }
    </div>
    )
}

const Modal = ({setIsOpen ,groupID}) => {
    const [found, setFound] = useState();
    const [members,  setMembers]  =  useState([]);
    const SearchUser = async (Email) => {
        try{
            const result = await getDocs(
                query(
                    collection(db, "Users"),
                    where("user_email" , "==", Email)
                )
            )
            console.log(result)
            if(result.docs.length){
                setFound(
                    { id : result.docs[0].id,  data : result.docs[0].data()}
                )
            }
        }
        catch(e){
            throw e;
        }
    }
    const UpdateUser = async  (userID, Update) => {
        try{
            console.log(userID, Update)
            await updateDoc(
                doc(collection(db,  "Users"), userID),
                Update
            )
        }
        catch(e){
            throw e;
        }
    }
    const addMember = async () => {
        try{
            console.log(members)
            if(members.length){
                for(const member of members){
                    await UpdateUser(member.id,  {
                        groups: arrayUnion( groupID)
                    })
                }
            }
        }
        catch(e){
            throw e;
        }
    }
    return (
    <div style={{ position : "absolute" , top : 0 , left : 0 , right : 0 , bottom : 0, backdropFilter : "blur(2px)" , zIndex : "2", display : "flex", justifyContent : "center", alignItems: "center"}}>
            <div style={{ background : "rgb(237, 233, 253)" , padding : "1rem"}}>
               <div style={{ fontSize : "12px", color : "rgb(114, 79, 249)" }}>
                    Add member
                </div>
                {
                    members?.map((data , index) => {
                        return(
                            <div style={{display : "flex", justifyContent : "center", alignItems :  "center", margin :  "0.5rem 0"}}>
                                <div style={{margin :  "5px"}}>{index + 1}</div>
                                <img src={data.data.user_avatar} style={{height  : "2.5rem"}}></img>
                                <div>
                                    <div style={{fontSize : "10px"}}>
                                        {data.data.user_name}
                                    </div>
                                    <div>
                                        {data.data.user_email}
                                    </div>
                                </div>
                            </div>
                        )
                    }) 
                }
                <div style={{display : "flex"}}>
                    <input placeHolder = {"Add Members"} style={{ padding : "0.2rem" , margin : "0.5rem", width : "12rem"}} onChange={async (e) => await SearchUser(e.target.value)}></input>
                    {
                        found ? 
                        <button style={{ margin : "0.5rem"}} onClick={async (e) => {setMembers((prev) => [...prev, found]); setFound()}}>Add</button>
                        :
                        <button disabled style={{ margin : "0.5rem"}}>Add</button>
                    }
                </div>
                {
                    found && 
                    <div style={{display : "flex", justifyContent : "center", alignItems :  "center", margin :  "0.5rem"}}>
                        <img src={found.data.user_avatar} style={{height  : "2.5rem"}}></img>
                        <div>
                            <div style={{fontSize : "10px"}}>
                                {found.data.user_name}
                            </div>
                            <div>
                                {found.data.user_email}
                            </div>
                        </div>
                    </div>
                }
                <div style={{display  :  "flex", justifyContent  :  "center", alignItems : "center"}}>
                    <button style={{margin : "0.5rem", padding : "0.4rem", color : 'white', background : "green", border : "none"}} onClick={async () => {await addMember(); window.location.reload()}}>Confirm</button>
                    <button style={{margin : "0.5rem", padding : "0.4rem", color : 'black', background : "", border : "none"}} onClick={() => setIsOpen(false)}>close</button>
                </div>
            </div>
        </div>     
    )
} 