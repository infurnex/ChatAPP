import {query, addDoc, arrayUnion, collection, doc, updateDoc, getDocs, where } from 'firebase/firestore';
import React, { useState } from 'react'
import { db } from '../Config';

export default function CreateGroup({userID}) {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div style={{display : "flex", justifyContent : "center", padding : "5px"}}>
          <div class="addbuttonb">
                <button onClick={() => setIsOpen(true)}>
                    Create Group
                </button>
            </div>
          {
              isOpen && <Modal setIsOpen={setIsOpen} ID = {userID}/>
          }
      </div>
    )
}

const Modal = ({setIsOpen ,ID}) => {
    const [groupName, setGroupName] = useState('');
    const [found, setFound] = useState();
    const [search,  setSearch] = useState(); 
    const [members,  setMembers]  =  useState([]);
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
    const CreateGroup = async () =>  {
        try{
            const result = await addDoc(
                collection(db, "GroupConnection"), {
                    GroupName : groupName,
                    GroupCreator : ID
                }
            )
            await UpdateUser(ID, {
                groups : arrayUnion( result.id )
            })
            if(members.length){
                for(const member of members){
                    await UpdateUser(member.id,  {
                        groups: arrayUnion( result.id)
                    })
                }
            }
            window.location.reload()
        }
        catch(e){
            console.log(e)
            throw e;
        }
    }
    return (
        <div style={{ position : "absolute" , top : 0 , left : 0 , right : 0 , bottom : 0, backdropFilter : "blur(2px)" , zIndex : "2", display : "flex", justifyContent : "center", alignItems: "center"}}>
            <div style={{ background : "rgb(237, 233, 253)" , padding : "1rem"}}>
               <div style={{ fontSize : "12px", color : "rgb(114, 79, 249)" }}>
                    Greate Group
                </div>
                <div >
                    <input placeHolder = {"GroupName"} style={{ padding : "0.2rem" , margin : "0.5rem", width : "15rem"}} value={groupName} onChange={(e) =>  {setGroupName(e.target.value)}}></input>
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
                    <input placeHolder = {"Add Members"} style={{ padding : "0.2rem" , margin : "0.5rem", width : "12rem"}} value={search} onChange={async (e) => {setSearch(e.target.value) ; await  SearchUser(e.target.value)}}></input>
                    {
                        found ? 
                        <button style={{ margin : "0.5rem"}} onClick={async (e) => {setMembers((prev) => [...prev, found]); setFound(); setSearch("")}}>Add</button>
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
                    <button style={{margin : "0.5rem", padding : "0.4rem", color : 'white', background : "green", border : "none"}} onClick={async () => {await CreateGroup()}}>Create</button>
                    <button style={{margin : "0.5rem", padding : "0.4rem", color : 'black', background : "", border : "none"}} onClick={() => setIsOpen(false)}>close</button>
                </div>
            </div>
        </div>
    )
}