// news.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
} from "https://www.gstatic.com/firebasejs/10.7.2/firebase-database.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js";
const firebaseConfig = {
  // Your Firebase configuration here
  apiKey: "AIzaSyDggUgkf6Z31HfBcA3q2tkJ_lnvJL3GQLs",
  authDomain: "todo-list-4dff9.firebaseapp.com",
  databaseURL: "https://todo-list-4dff9-default-rtdb.firebaseio.com",
  projectId: "todo-list-4dff9",
  storageBucket: "todo-list-4dff9.appspot.com",
  messagingSenderId: "582460921344",
  appId: "1:582460921344:web:0604443e0deed9eee66ae5",
  measurementId: "G-NM9VQ4D4LF",
};
const app = initializeApp(firebaseConfig);
//  const db = firebase.database();
const db = getDatabase();
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// const analytics = getAnalytics(app);

// ... Your existing code

// Initialize Firebase
const auth = getAuth(app);
// Reference to the news cards container
const cardsContainer = document.getElementById("cards-container");

// Handle the "Check News" button click event
cardsContainer.addEventListener("click", (event) => {
  const target = event.target;

  // Check if the clicked element is the "Check News" button
  if (target.matches("#news-link")) {
    // Your existing logic to check news
    checkNews();
  }

  // Check if the clicked element is the "Add to Favorite" icon
  if (target.matches("#addToFavourite")) {
    // Your logic to add news to favorites
    addToFavorites(target);
  }
});

// Function to add news to favorites
function addToFavorites(bookmarkIcon) {
  // Check if the user is logged in before allowing access
  if (!auth.currentUser) {
    alert("Please login to add to favorites.");
    return;
  }

  // Get the corresponding news card
  const newsCard = bookmarkIcon.closest(".card");

  // Extract news details from the card
  const title = newsCard.querySelector("#news-title").innerText;
  const source = newsCard.querySelector("#news-source").innerText;
  const description = newsCard.querySelector("#news-desc").innerText;
  const imageURL = newsCard.querySelector("#news-img").src; // Get the image URl

  // Get the user's UID
  const userUID = auth.currentUser.uid;

  // Get a reference to the user's favorites node in the database
  const userFavoritesRef = ref(db, `userFavorites/${userUID}`);

  // Add the news to favorites in the database
  push(userFavoritesRef, {
    title,
    source,
    description,
    imageURL, // Include the image URL
  })
    .then(() => {
      alert("News added to favorites!");
    })
    .catch((error) => {
      console.error("Error adding to favorites:", error.message);
    });
}
// Function to remove news from favorites
// function removeFromFavorites(key) {
//   // Get the user's UID
//   const userUID = auth.currentUser.uid;

//   // Get a reference to the user's favorites node in the database
//   const userFavoritesRef = ref(db, `userFavorites/${userUID}/${key}`);

//   // Remove the news from favorites in the database
//   remove(userFavoritesRef)
//     .then(() => {
//       alert("News removed from favorites!");
//     })
//     .catch((error) => {
//       console.error("Error removing from favorites:", error.message);
//     });
// }
// removeFromFavorites(key);
