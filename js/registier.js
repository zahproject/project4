// Get form and inputs
let registerForm = document.querySelector("#register-form");
let usernameInput = document.querySelector("#username");
let emailInput = document.querySelector("#email");
let passwordInput = document.querySelector("#password");
let confirmPasswordInput = document.querySelector("#confirm-password");

registerForm.addEventListener("submit", function(e) {
    e.preventDefault(); // prevent form submission

    let username = usernameInput.value.trim();
    let email = emailInput.value.trim();
    let password = passwordInput.value;
    let confirmPassword = confirmPasswordInput.value;

    // Check if any field is empty
    if(!username || !email || !password || !confirmPassword) {
        alert("Please fill all form fields");
        return;
    }

    // Check if passwords match
    if(password !== confirmPassword) {
        alert("Passwords do not match");
        return;
    }

    // Save user info to localStorage
    localStorage.setItem("username", username);
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);

    alert("Registration successful! Redirecting to login...");

    setTimeout(() => {
        window.location = "login.html"; // redirect after registration
    }, 1500);
});