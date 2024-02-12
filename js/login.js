import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import {
  getDatabase,
  ref,
  get,
  child,
} from "https://www.gstatic.com/firebasejs/10.7.2/firebase-database.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDggUgkf6Z31HfBcA3q2tkJ_lnvJL3GQLs",
  authDomain: "todo-list-4dff9.firebaseapp.com",
  databaseURL: "https://todo-list-4dff9-default-rtdb.firebaseio.com",
  projectId: "todo-list-4dff9",
  storageBucket: "todo-list-4dff9.appspot.com",
  messagingSenderId: "582460921344",
  appId: "1:582460921344:web:0604443e0deed9eee66ae5",
  measurementId: "G-NM9VQ4D4LF",
};
// const provider = new GoogleAuthProvider(app);
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);
const dbref = ref(db);

document.addEventListener("DOMContentLoaded", function () {
  // Reference the logoutBtn element
  let logoutBtn = document.getElementById("logoutBtn");

  // Attach the logout event listener
  logoutBtn.addEventListener("click", LogoutUser);
  // const googleSignInButton = document.getElementById("googleSignIn");
  // googleSignInButton.addEventListener("click", SignInWithGoogle);
});

let EmailInp = document.getElementById("email");
let PassInp = document.getElementById("password");

// let logoutBtn = document.getElementById("logoutBtn");

onAuthStateChanged(auth, (user) => {
  let loginBtn = document.getElementById("loginBtn");
  let signupBtn = document.getElementById("signupBtn");
  let newsLinks = document.querySelectorAll("#news-link");
  let admin = document.getElementById("admin");
  let navLinks = document.querySelectorAll(".nav-link");
  let searchBtn = document.getElementById("search-button");

  if (user) {
    loginBtn.style.display = "none";
    signupBtn.style.display = "none";
    logoutBtn.style.display = "block";

    newsLinks.forEach((link) => {
      link.removeAttribute("disabled");
    });
    admin.style.display = "block";

    navLinks.forEach((link) => {
      link.classList.remove("disabled");
      link.removeAttribute("aria-disabled");
    });

    searchBtn.classList.remove("disabled");
    searchBtn.removeAttribute("aria-disabled");
    //  link.removeAttribute("aria-disabled");
  } else {
    loginBtn.style.display = "block";
    signupBtn.style.display = "block";
    logoutBtn.style.display = "none";

    newsLinks.forEach((link) => {
      link.setAttribute("disabled", true);
    });

    admin.style.display = "none";
    navLinks.forEach((link) => {
      link.classList.add("disabled");
      link.setAttribute("aria-disabled", true);
    });
    searchBtn.classList.add("disabled");
    searchBtn.setAttribute("aria-disabled", true);
  }
});

function SignInUser(evt) {
  evt.preventDefault();

  signInWithEmailAndPassword(auth, EmailInp.value, PassInp.value)
    .then((credentials) => {
      alert("Login successful");
      get(child(dbref, "UsersAuthList/" + credentials.user.uid)).then(
        (snapshot) => {
          if (snapshot.exists) {
            sessionStorage.setItem(
              "user-info",
              JSON.stringify({ name: snapshot.val().name })
            );
            sessionStorage.setItem(
              "user-creds",
              JSON.stringify(credentials.user)
            );
            window.location.assign("./index.html");
          }
        }
      );
    })
    .catch((error) => {
      alert(error.message);
    });
}

function LogoutUser() {
  signOut(auth)
    .then(() => {
      alert("Logged out");
      window.location.assign("./index.html");
    })
    .catch((error) => {
      console.log(error.message);
    });
}
let main = document.querySelector("#registrationForm");

main.addEventListener("submit", SignInUser);
