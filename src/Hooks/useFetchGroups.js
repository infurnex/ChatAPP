import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "../Config";
import { useState, useEffect } from 'react';

const useFetchGroups = (ID) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userGroups, setUserGroups] = useState([]);

    const getDocuments = async  (GroupID) => {
        const result = await getDoc(doc(collection(db, "GroupConnection"), GroupID));
        return {
            id : result.id , data : result.data()
        }
    }

  const fetchData = async () => {
    setIsLoading(true);
    try {
        const User = await  getDoc(doc(collection(db, "Users"), ID));
        const Groups  = User.data().groups;
        for(const group of Groups){
            console.log(group)
            const result = await getDocuments(group);
            setUserGroups((prev) => [...prev, result])
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

  return { isLoading, userGroups, error, isError };
};

export default useFetchGroups;