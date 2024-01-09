import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "../Config";
import { useState, useEffect } from 'react';

const useFetchDoc = (collection_name, doc_id) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const result = await getDoc(doc(collection(db,  collection_name), doc_id));
      setData(result);
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

  return { isLoading, data, error, isError };
};

export default useFetchDoc;
