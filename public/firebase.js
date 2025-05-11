// firebase.js

// Example for Firebase v9+ modular SDK
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  // ...your config...
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export async function uploadFile(file) {
  const storageRef = ref(storage, 'uploads/' + file.name);
  const snapshot = await uploadBytes(storageRef, file);
  return await getDownloadURL(snapshot.ref);
}