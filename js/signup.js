// function openSignUp() {
//   window.location.href = "signup.html";
// }
// function validateForm() {
//   // let EmailInp = document.getElementById("email").value;
//   // let PassInp = document.getElementById("password").value;
//   // let nameInp = document.getElementById("name").value;
//   // let confirmPassInp = document.getElementById("confirm_password").value;
//   let EmailInp = document.getElementById("email").value;
//   let PassInp = document.getElementById("password").value;
//   let nameInp = document.getElementById("name").value;
//   let confirmPassInp = document.getElementById("confirm_password").value;

//   // if (
//   //   nameInp == "" ||
//   //   EmailInp == "" ||
//   //   PassInp == "" ||
//   //   confirmPassInp == ""
//   // ) {
//   //   alert("All fields must be filled out");
//   //   return;
//   // }

//   // if (PassInp != confirmPassInp) {
//   //   alert("Password and Confirm Password must match");
//   //   return;
//   // }

//   // Add more complex validation if needed

//   // If validation passes, the form will be submitted
//   // document.getElementById("registrationForm").submit();

//   document.addEventListener("DOMContentLoaded", function () {
//     document.getElementById("registrationForm").submit();
//   });
//   // Check if any field is empty
//   if (
//     nameInp.trim() === "" ||
//     EmailInp.trim() === "" ||
//     PassInp.trim() === "" ||
//     confirmPassInp.trim() === ""
//   ) {
//     alert("All fields must be filled out");
//     return false; // Prevent form submission
//   }

//   // Check if password and confirm password match
//   if (PassInp !== confirmPassInp) {
//     alert("Password and Confirm Password must match");
//     return false; // Prevent form submission
//   }

//   // Check if password meets complexity requirements (e.g., length)
//   if (PassInp.length < 8) {
//     alert("Password must be at least 8 characters long");
//     return false; // Prevent form submission
//   }

//   // You can add more complex validation rules as needed

//   // If all validations pass, the form will be submitted
//   return true;
// }
function openSignUp() {
  window.location.href = "signup.html";
}
