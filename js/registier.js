let registerForm = document.querySelector("#register-form");
let usernameInput = document.querySelector("#username");
let emailInput = document.querySelector("#email");
let passwordInput = document.querySelector("#password");
let confirmPasswordInput = document.querySelector("#confirm-password");

registerForm.addEventListener("submit", function(e) {
    e.preventDefault(); 

    let username = usernameInput.value.trim();
    let email = emailInput.value.trim();
    let password = passwordInput.value;
    let confirmPassword = confirmPasswordInput.value;


    if(!username || !email || !password || !confirmPassword) {
        alert("Please fill all form fields");
        return;
    }


    if(password !== confirmPassword) {
        alert("Passwords do not match");
        return;
    }

   
    localStorage.setItem("username", username);
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);

    alert("Registration successful! Redirecting to login...");

    setTimeout(() => {
        window.location = "login.html"; 
    }, 1500);
});