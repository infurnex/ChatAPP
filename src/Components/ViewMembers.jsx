import React, { useState } from 'react'
import { arrayUnion, collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { db } from '../Config';
import { useCollection } from 'react-firebase-hooks/firestore';

export default function ViewMembers({groupID}) {
    const [isOpen, setIsOpen] = useState(false);
    return(
    <div>
    <button style={{padding : "5px 10px", marginLeft  : "10px" , borderRadius  :  "3px", background : "rgb(0 220 150)", color : "white", border : "none",boxShadow : "0  2px 10px rgba(0, 0, 0, 0.2)"}} onClick={() => {setIsOpen(true)}}>
        view
    </button>
    {
        isOpen &&
        <Modal setIsOpen={setIsOpen} groupID={groupID}/>
    }
    </div>
    )
}

const Modal = ({setIsOpen ,groupID}) => {
    const [value, loading] = useCollection(
        query(collection(db, "Users"), where("groups", "array-contains", groupID))
    )
    return (
    <div style={{ position : "absolute" , top : 0 , left : 0 , right : 0 , bottom : 0, backdropFilter : "blur(2px)" , zIndex : "2", padding : "5% 30%",  overflowY :  "auto"}}>
        <button style={{ padding : "0.4rem", color : 'white', background : "black", border : "none"}} onClick={() => setIsOpen(false)}>close</button>
        <div style={{ background : "rgb(237, 233, 253)" , padding : "1rem"}}>
            {
            value?.docs.map((doc, index) => {
                const data = doc.data();
            return(
                <div style={{display : "flex", justifyContent : "left", alignItems :  "center", margin :  "0.5rem 0", padding : "0 15%"}}>
                    <div style={{margin :  "0 1rem"}}>
                        {index  +  1}
                    </div>
                    <img src={data.user_avatar} style={{height  : "2.5rem"}}></img>
                    <div>
                        <div style={{fontSize : "10px"}}>
                            {data.user_name}
                        </div>
                        <div>
                            {data.user_email}
                        </div>
                    </div>
                </div>
            )})
            }
        </div>
    </div>     
    )
} 