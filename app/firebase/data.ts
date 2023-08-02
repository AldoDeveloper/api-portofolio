
import { FirebaseApp } from "firebase/app";
import { getDatabase, ref, child, get, set } from "firebase/database";
import { Users } from "../../types/types";

export async function getAllData(app: FirebaseApp, keys?: string){
    const dbRef   = ref(getDatabase(app));
    const showAll = await get(child(dbRef, keys));
    return showAll.val();
}

export async function createData(app: FirebaseApp, uuid: string, user: Users){
    const dbRef  = getDatabase(app);
    const seting = await set(ref(dbRef, 'users/' + uuid), user);
    return true;
}