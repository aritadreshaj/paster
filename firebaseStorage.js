import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBOELnwxCpCvO5o46Ib0eX0dpv0AZ3tBLc",
  authDomain: "answers-5945c.firebaseapp.com",
  projectId: "answers-5945c",
  storageBucket: "answers-5945c.appspot.com",
  messagingSenderId: "266101131235",
  appId: "1:266101131235:web:4fb2809ee4578e362c42d6",
  measurementId: "G-G7LZ2EHPGQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Storage
const storage = getStorage(app);

// Upload function
const uploadFile = async (file) => {
  try {
    // Create a reference to where you want to store the file
    const storageRef = ref(storage, 'uploads/' + file.name);  // Path in Firebase Storage

    // Upload the file
    await uploadBytes(storageRef, file);
    console.log('File uploaded successfully');

    // Get the file URL
    const fileURL = await getDownloadURL(storageRef);
    console.log('File URL:', fileURL);
    return fileURL;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};

export { uploadFile };
