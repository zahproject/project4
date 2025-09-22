let user_info = document.querySelector("#user_info");
let userdate = document.querySelector("#user");
let links = document.querySelector("#links");
let logoutbtn = document.querySelector("#logout");

// If user is logged in, show user info
if (localStorage.getItem("username")) {
    links.remove();  // hide login/register links
    user_info.style.display = "flex"; // show user info
    userdate.innerHTML = localStorage.getItem("username");
}

// Logout button
logoutbtn.addEventListener("click", function() {
    localStorage.clear();
    setTimeout(() => {
        window.location = "login.html";  // redirect after logout
    }, 1500);
});

// ////////////////