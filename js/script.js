let user_info = document.querySelector("#user_info");
let userdate = document.querySelector("#user");
let links = document.querySelector("#links");
let logoutbtn = document.querySelector("#logout");

let cartContainer = document.querySelector("#cart-container");
let cartCountEl = document.querySelector("#cart-count");
let miniCart = document.querySelector("#mini-cart");
let miniCartItems = document.querySelector("#mini-cart-items");
let goToCartBtn = document.querySelector("#go-to-cart");


if (localStorage.getItem("username")) {
    links.style.display = "none"; 
    user_info.style.display = "flex";
    userdate.innerHTML = localStorage.getItem("username");
}

logoutbtn.addEventListener("click", function() {
    localStorage.clear();
    setTimeout(() => {
        window.location = "login.html";
    }, 500);
});


let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderMiniCart() {
    miniCartItems.innerHTML = "";

    cart.forEach((item, index) => {
        let div = document.createElement("div");
        div.className = "mini-cart-item";
        div.style.display = "flex";
        div.style.justifyContent = "space-between";
        div.style.alignItems = "center";
        div.style.marginBottom = "8px";
        div.innerHTML = `
            <img src="${item.img}" alt="${item.title}" style="width:40px; height:40px; object-fit:cover; margin-right:5px;">
            <div style="flex:1; margin-right:5px;">
                <p style="margin:0; font-size:10px; color:black;">${item.title}</p>
                <p style="margin:0; font-size:10px; color:black;">$${item.price.toFixed(2)}</p>
            </div>
            <div>
                <button class="minus" data-index="${index}">-</button>
                <span>${item.quantity || 1}</span>
                <button class="plus" data-index="${index}">+</button>
            </div>
        `;
        miniCartItems.appendChild(div);
    });

 
    miniCartItems.querySelectorAll(".plus").forEach(btn => {
        btn.addEventListener("click", () => {
            let i = btn.dataset.index;
            cart[i].quantity = (cart[i].quantity || 1) + 1;
            localStorage.setItem("cart", JSON.stringify(cart));
            renderMiniCart();
            updateCartCount();
        });
    });


    miniCartItems.querySelectorAll(".minus").forEach(btn => {
        btn.addEventListener("click", () => {
            let i = btn.dataset.index;
            cart[i].quantity = (cart[i].quantity || 1) - 1;
            if(cart[i].quantity <= 0) cart.splice(i,1);
            localStorage.setItem("cart", JSON.stringify(cart));
            renderMiniCart();
            updateCartCount();
        });
    });

    updateCartCount();
}

renderMiniCart();


function updateCartCount() {
    cartCountEl.innerText = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
}

// //////////////////////////////////




cartContainer.addEventListener("click", () => {
    miniCart.style.display = miniCart.style.display === "none" ? "block" : "none";
});


goToCartBtn.addEventListener("click", () => {
    window.location = "cart.html";
});


renderMiniCart();

// ////////////

let addCartButtons = document.querySelectorAll(".add-cart");
let likeButtons = document.querySelectorAll(".heart");

addCartButtons.forEach((btn, index) => {
    btn.addEventListener("click", () => {
        let card = btn.closest(".card");
        let title = card.querySelector("h3").innerText;
        let price = parseFloat(card.querySelector(".price").innerText.replace("$", ""));
        let img = card.querySelector("img").src;

     
        let existing = cart.find(item => item.title === title);
        if(existing){
            existing.quantity = (existing.quantity || 1) + 1;
        } else {
            cart.push({ title, price, img, quantity: 1 });
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        renderMiniCart();
    });
});

likeButtons.forEach((btn, index) => {
    btn.addEventListener("click", () => {
        let card = btn.closest(".card");
        let title = card.querySelector("h3").innerText;
        let price = parseFloat(card.querySelector(".price").innerText.replace("$", ""));
        let img = card.querySelector("img").src;

        let liked = JSON.parse(localStorage.getItem("liked")) || [];

  
        if(!liked.find(item => item.title === title)){
            liked.push({ title, price, img });
        }

        localStorage.setItem("liked", JSON.stringify(liked));
        alert(`${title} added to Liked Products ❤`);
    });
});

// //////////////////////////////
document.addEventListener("DOMContentLoaded", () => {
    const searchBtn = document.getElementById("searchBtn");
    const categorySelect = document.getElementById("category");
    const searchInput = document.getElementById("searchInput");
    const cards = document.querySelectorAll(".card");
  
    searchBtn.addEventListener("click", () => {
      const category = categorySelect.value.toLowerCase();
      const keyword = searchInput.value.trim().toLowerCase();
  
      cards.forEach(card => {
        const title = card.querySelector("h3").innerText.toLowerCase();
        const cardCategory = card.querySelector(".category").innerText.toLowerCase();
  
        const matchKeyword = keyword === "" || title.includes(keyword);
        const matchCategory = category === "" || cardCategory === category;
  
        if (matchKeyword && matchCategory) {
          card.style.display = "block"; 
        } else {
          card.style.display = "none"; 
        }
      });
    });
  });


//   /////////////


