// submit.js

import { uploadFile } from './firebase.js';  // Import the upload function from firebase.js

document.getElementById("submissionForm").addEventListener("submit", async (event) => {
  event.preventDefault();  // Prevent default form submission

  // Get form data
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const file = document.getElementById("fileInput").files[0];

  if (!file) {
    alert("Please select a file.");
    return;
  }

  try {
    // Upload the file to Firebase
    const fileURL = await uploadFile(file);  // Upload file and get URL
    alert('File uploaded successfully. File URL: ' + fileURL);

    // Optionally: You can send the name, email, and file URL to your server or store in Firestore
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Uploaded File URL:', fileURL);
  } catch (error) {
    console.error("Error during form submission:", error);
    alert("An error occurred. Please try again.");
  }
});
