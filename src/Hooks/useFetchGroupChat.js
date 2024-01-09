import { collection, doc, getDoc,query , getDocs, limit, orderBy } from "firebase/firestore";
import { db } from "../Config";
import { useState, useEffect } from 'react';

const useFetchGroupChats = (GroupID) => {
  const [error, setError] = useState(null);
  const [userGroupChats, setUserGroupChats] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const fetchData = async () => {
    setIsLoading(true);
    try {
        const parentDocRef = doc(db, "GroupConnection", GroupID);
        const chatRef = collection(parentDocRef, "Messages");
        const value = await getDocs(
          query(chatRef, orderBy("timeStamp", "desc"), limit(50))
        )
        // for(const doc of value.docs){
        //   const user = await getDoc(doc.data().sender_ref)
        //   setUserGroupChats((prev) => 
        //     setUserGroupChats([...prev , {
        //       message : doc.data(),
        //       sender  : user.data()
        //     }])
        //   )
        // }
        setUserGroupChats(value);
    } catch (err) {
        console.log(err)
      setError(err);
    } finally {
        setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const isError = error !== null;

  return {isLoading, userGroupChats, error, isError };
};

export default useFetchGroupChats;