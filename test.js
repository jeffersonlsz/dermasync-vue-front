import { doc, getDoc } from "firebase/firestore";
import { db } from "./config";

async function testGetDoc(uid) {
    try {
        const docRef = doc(db, "usuarios", uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Document found:", docSnap.data());
        } else {
            console.log("Document not found");
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

testGetDoc("the_uid_you_are_testing").then(() => console.log("Test complete"));