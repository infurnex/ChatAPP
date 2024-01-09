import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "../Config";
import { useState, useEffect } from 'react';

const useFetchContacts = (ID) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userContacts , setuserConnections] = useState([]);

  const getDocuments = async  (connection_id, ID) => {
        const result = await getDoc(doc(collection(db, "Connections"), connection_id));
        const data = result.data().users;
        console.log(data);
        if(data[0] === ID){
            const userConnected = await getDoc(doc(collection(db, "Users"), data[1]))
            return userConnected.data()
        }
        else{
            const userConnected = await getDoc(doc(collection(db, "Users"), data[0]));
            return userConnected.data()
        }
    }

  const fetchData = async () => {
    setIsLoading(true);
    try {
        const User = await  getDoc(doc(collection(db, "Users"), ID));
        const connections  = User.data().connections;
        for(const connection of connections){
            console.log(connection)
            const result = await getDocuments(connection.connection_id, ID);
            setuserConnections((prev) => [...prev, {
                connectionID : connection.connection_id,
                connectionInitiator : connection.initiator,
                connectionAccepted : connection.accepted,
                user : result
            }])
        }
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const isError = error !== null;

  return { isLoading, userContacts, error, isError };
};

export default useFetchContacts;