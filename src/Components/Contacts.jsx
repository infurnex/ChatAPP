import useFetchContacts from '../Hooks/useFetchContacts';
import Loader from './Loader';

export default function Contacts({ID, setSelectUser, selectUser}) {
    const {isLoading, userContacts} = useFetchContacts(ID);
    if(isLoading){
        return( 
        <div style={{flex : 1 ,display : "flex",  justifyContent :  "center",  alignItems  :  "center"}}>
            <Loader/>
        </div>
        )
    }
    const accepted =  userContacts?.filter((e) => { console.log(e);  return (e.connectionAccepted)});
    const nonAccepted =   userContacts?.filter((e) => { console.log(e);  return (e.connectionAccepted == null)});
    return (
        <div style={{ flex : "1" , padding : "1rem",  display : "flex", flexDirection  : "column"}}>
            {
                !accepted.length && !nonAccepted.length ?
                <div style={{ textAlign :  "center", margin:'50% 0', color :  "gray"}}>
                    Add Contact
                </div> : <></>
            }
            <div>
                {
                   accepted.length ?  <div style={{color : 'rgb(114, 79, 249)', fontSize : "10px"}}>
                        <div>
                            Contacts
                        </div>
                        <div style={{width : "100%",  height : "1px" , background : "rgb(114, 79, 249)", margin  : "0.5rem 0"}}>
                        </div>
                    </div> : <></>
                }
            </div>
            <div style={{flex : 1, position : "relative"}}>
                <div style={{position : "absolute", top: 0,left :  0, right : 0 , bottom : 0 , overflowY  : "auto"}} className='custom-scrollbar'>
                    {
                        accepted?.map(e => {
                            const { user} = e;
                            return(
                                <div style={{ background : selectUser?.connectionID === e.connectionID ? "rgb(114, 79, 249)" : "white", color : selectUser?.connectionID == e.connectionID ?  "white" : "black"  , display : "flex" , alignItems : "center" , padding : "0.5rem", marginBottom : "0.5rem", borderRadius : "4px"}} onClick={() => setSelectUser(e)}>
                                    <img src={user.user_avatar} style={{borderRadius : "10rem" , background : "white", height : "2rem", width : "2rem" , margin : "0 0.5rem"}}/>
                                    <div style={{display : 'flex', flexDirection : "column" , textAlign : "left"}}>
                                        <div style={{ fontSize : "1rem", fontWeight : "bold", fontSize : "14px"}}>
                                            {user.user_name}
                                        </div>
                                        <div style={{fontSize : "10px"}}>
                                            {user.user_email}
                                        </div>
                                    </div>
                                </div>
                            )
                        }) 
                    }
                    {
                        nonAccepted.length ?
                        <div style={{color : 'rgb(114, 79, 249)', fontSize : "10px"}}>
                            <div>
                                Invitations
                            </div>
                            <div style={{width : "100%",  height : "1px" , background : 'rgb(114, 79, 249)', margin  : "0.5rem 0"}}>
                            </div>
                        </div> : <></>
                    }
                    <div>
                        {
                            nonAccepted?.map(e => {
                                const { user} = e;
                                return(
                                    <div style={{ background : selectUser?.connectionID === e.connectionID ? "rgb(114, 79, 249)" : "white", color : selectUser?.connectionID == e.connectionID ?  "white" : "black"  , display : "flex" , alignItems : "center" , padding : "0.5rem", marginBottom : "0.5rem", borderRadius : "4px"}} onClick={() => setSelectUser(e)}>
                                        <img src={user.user_avatar} style={{borderRadius : "10rem" , background : "white", height : "2rem", width : "2rem" , margin : "0 0.5rem"}}/>
                                        <div style={{display : 'flex', flexDirection : "column" , textAlign : "left"}}>
                                            <div style={{ fontSize : "1rem", fontWeight : "bold", fontSize : "14px"}}>
                                                {user.user_name}
                                            </div>
                                            <div style={{fontSize : "10px"}}>
                                                {user.user_email}
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
