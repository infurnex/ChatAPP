import React, { useState } from 'react'
import Groups from '../Components/Groups';
import CreateGroup from '../Components/CreateGroup';
import GroupChat from '../Components/GroupChat';
import GroupMessage from '../Components/GroupMessage';
import GroupFeatures from '../Components/GroupFeatures';

export default function Group({User}) {
    const [selectgroup , setSelectGroup] = useState();
    const [groupName, setGroupName] = useState()
  return (
    <div style={{display : 'flex', flex : 1, width : "85vw", background : "#f4f4fa"}}>
        <div style={{flex : 1 , height : "100%" , display : "flex" , flexDirection : "column" , background : "#ede9fd"}}>
            <Groups setSelectGroup = {setSelectGroup} selectgroup = {selectgroup} UserID = {User.UserID} setGroupName={setGroupName}/>
            <CreateGroup userID = {User.UserID}/>
        </div>
        <div style={{flex : 3 , display : "flex", flexDirection : "column"}}>
            { selectgroup ? 
                <>
                <GroupFeatures GroupName = {groupName} GroupID={selectgroup}/>
                <GroupChat GroupID={selectgroup}  senderID={User.UserID}/>
                <GroupMessage senderDetails = {User.UserDetail} groupID={selectgroup} senderID={User.UserID}/>
                </>
            : <div style={{ textAlign : "center", margin : "5rem 0",fontSize : "1.5rem" , color : "gray"}}> Select Group</div>}
        </div>
    </div>
  )
}
