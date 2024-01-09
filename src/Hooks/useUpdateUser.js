import { collection, doc, getDoc } from "firebase/firestore"
import { db } from "../Config"

export default async function UpdateUserHook(UserID) {
    const user = await getDoc(doc(collection(db,  "Users"), UserID));
    
    localStorage.setItem("User", JSON.stringify(
        {
            UserID : user.id,
            UserDetail : user.data()
        }))
}