let user_info = document.querySelector("#user_info");
let userdate = document.querySelector("#user");
let links = document.querySelector("#links");
let logoutbtn = document.querySelector("#logout");

if (localStorage.getItem("username")) {
    links.remove();  
    user_info.style.display = "flex"; 
    userdate.innerHTML = localStorage.getItem("username");
}


logoutbtn.addEventListener("click", function() {
    localStorage.clear();
    setTimeout(() => {
        window.location = "login.html";  
    }, 1500);
});
