import AddMember from "./AddMember";
import ViewMembers from "./ViewMembers";

export default function GroupFeatures({GroupName, GroupID}) {
  return (
    <div>
      <div style={{ display  : "flex", alignItems :  "center", padding : "0 1rem"}}>
          <div style={{flex : 1, fontSize : "0.9rem", fontWeight : "bold"}}>
            {GroupName}
          </div>
          <AddMember groupID={GroupID}/>
          <ViewMembers groupID={GroupID}/>
      </div>
      <div style={{width : "90%" , borderRadius  : "10px" , margin :  "10px auto", height : "2px", background : "rgb(182, 167, 240)"}}></div>
    </div>
  )
}
