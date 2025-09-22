let loginForm = document.querySelector("#login-form");
let emailInput = document.querySelector("#email");
let passwordInput = document.querySelector("#password");


let storedEmail = localStorage.getItem("email");
let storedPassword = localStorage.getItem("password");

loginForm.addEventListener("submit", function(e) {
    e.preventDefault(); 

    let email = emailInput.value.trim();
    let password = passwordInput.value;

    if(email === "" || password === "") {
        alert("Please fill all information");
        return;
    }

    if(storedEmail && storedPassword && email === storedEmail && password === storedPassword) {
        alert("Login successful!");
        setTimeout(() => {
            window.location = "index.html"; 
        }, 1000);
    } else {
        alert("Wrong credentials, try again");
    }
});