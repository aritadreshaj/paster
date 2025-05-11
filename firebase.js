import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

// ✅ Your actual Firebase project config
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "answers-5945c.firebaseapp.com",
  projectId: "answers-5945c",
  storageBucket: "answers-5945c.firebasestorage.app",
  messagingSenderId: "266101131235",
  appId: "1:266101131235:web:4fb2809ee4578e362c42d6",
  measurementId: "G-G7LZ2EHPGQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth
const auth = getAuth(app);

// Initialize Firebase Storage
const storage = getStorage(app);

// File upload function
const uploadFile = async (file, folderName = "uploads") => {
  try {
    // Ensure user is authenticated (anonymous sign-in)
    await signInAnonymously(auth);

    const storageRef = ref(storage, `${folderName}/${file.name}`);  // User-specific folder in Firebase Storage
    await uploadBytes(storageRef, file);  // Upload file
    console.log('File uploaded successfully');

    // Get the file URL
    const fileURL = await getDownloadURL(storageRef);
    console.log('File URL:', fileURL);
    return fileURL;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error; // Rethrow so the caller can handle it
  }
};

export { uploadFile };  // Export uploadFile function