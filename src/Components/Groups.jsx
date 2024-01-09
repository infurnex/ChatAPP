
import useFetchGroups from '../Hooks/useFetchGroups';
import Loader from './Loader';

export default function Groups({UserID, setSelectGroup, setGroupName, selectgroup}) {
    const {isLoading , userGroups} = useFetchGroups(UserID);
    if(isLoading){
        return(
            <div style={{flex : 1 ,display : "flex",  justifyContent :  "center",  alignItems  :  "center"}}>
                <Loader/>
            </div>
        )
    }
  return (
    <div style={{ flex : "1", padding : "1rem", display : "flex", flexDirection  : "column"}}>
        <div style={{display : "flex", justifyContent : "center", marginBottom : "0.5rem"}}>
            <input placeholder='...Search' type='text' style = {{padding : "0.3rem 1rem" , width : "85%" , borderRadius : "16px", border : "1px solid black", boxShadow : "0  2px 5px rgba(0, 0, 0, 0.2)" , border  : "none"}}/>
        </div>
        <div style={{color : 'rgb(114, 79, 249)', fontSize : "10px" , fontWeight : "bold", display  : "flex", flexDirection  : 'column'}}>
            <div>
                Groups
            </div>
            <div style={{width : "100%",  height : "1px" , background : "rgb(114, 79, 249)", margin  : "0.5rem 0"}}>
            </div>
        </div>
        <div style={{flex : 1, position : "relative"}}>
            <div style={{position : "absolute", top: 0,left :  0, right : 0 , bottom : 0 , overflowY  : "auto"}} className='custom-scrollbar'>
                <div>
                    {
                        userGroups?.map((e) => {
                            return (
                                <div style={{ background : selectgroup == e.id ? "rgb(114, 79, 249)" : "white", color : selectgroup == e.id ?  "white" : "black" , display : "flex" , alignItems : "center", padding : "0.5rem", marginBottom : "0.5rem", borderRadius : "4px"}} onClick={() =>{ setSelectGroup(e.id) ; setGroupName(e.data.GroupName)}}>
                                    <svg style={{fill : selectgroup == e.id ? "white" : "rgb(114, 79, 249)", margin : "0 0.4rem"}} xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M0-240v-63q0-43 44-70t116-27q13 0 25 .5t23 2.5q-14 21-21 44t-7 48v65H0Zm240 0v-65q0-32 17.5-58.5T307-410q32-20 76.5-30t96.5-10q53 0 97.5 10t76.5 30q32 20 49 46.5t17 58.5v65H240Zm540 0v-65q0-26-6.5-49T754-397q11-2 22.5-2.5t23.5-.5q72 0 116 26.5t44 70.5v63H780Zm-455-80h311q-10-20-55.5-35T480-370q-55 0-100.5 15T325-320ZM160-440q-33 0-56.5-23.5T80-520q0-34 23.5-57t56.5-23q34 0 57 23t23 57q0 33-23 56.5T160-440Zm640 0q-33 0-56.5-23.5T720-520q0-34 23.5-57t56.5-23q34 0 57 23t23 57q0 33-23 56.5T800-440Zm-320-40q-50 0-85-35t-35-85q0-51 35-85.5t85-34.5q51 0 85.5 34.5T600-600q0 50-34.5 85T480-480Zm0-80q17 0 28.5-11.5T520-600q0-17-11.5-28.5T480-640q-17 0-28.5 11.5T440-600q0 17 11.5 28.5T480-560Zm1 240Zm-1-280Z"/></svg>
                                    <div style={{display : 'flex', fontSize : "14px" ,flexDirection : "column" , textAlign : "left" ,  fontWeight : selectgroup == e.id ? "bold" : ""}}>
                                        <div className=''>
                                            {e.data.GroupName}
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    </div>
  )
}
