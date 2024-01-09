import { collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../Config";
import { useState } from 'react';


const useUpdateDoc = (collection_name, doc_id) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const mutate = async (update) => {
    setIsLoading(true);
    try {
      await updateDoc(
        doc(collection(db,  collection_name), doc_id),
        update
      );
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return { mutate, isLoading, error };
};

export default useUpdateDoc;