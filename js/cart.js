let cartItemsContainer = document.getElementById("cart-items");
let likedItemsContainer = document.getElementById("liked-items");
let totalPriceEl = document.getElementById("total-price");

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let liked = JSON.parse(localStorage.getItem("liked")) || [];


function renderItems(container, items, isCart=true) {
    container.innerHTML = "";
    items.forEach((item, index) => {
        let div = document.createElement("div");
        div.className = "cart-item";
        div.innerHTML = `
            <img src="${item.img}" alt="${item.title}">
            <div class="cart-item-info">
                <h4>${item.title}</h4>
                <p>$${item.price.toFixed(2)}</p>
            </div>
            ${isCart ? `
            <div class="cart-item-controls">
                <button class="minus" data-index="${index}">-</button>
                <span>${item.quantity || 1}</span>
                <button class="plus" data-index="${index}">+</button>
                <button class="remove" data-index="${index}">Remove</button>
            </div>` 
            : `
            <button class="unlike" data-index="${index}" style="font-size:18px; color:red; border:none; background:none; cursor:pointer;">❤</button>`}
        `;
        container.appendChild(div);
    });

    if(isCart){
      
        container.querySelectorAll(".plus").forEach(btn => {
            btn.addEventListener("click", () => {
                let i = btn.dataset.index;
                cart[i].quantity = (cart[i].quantity || 1) + 1;
                localStorage.setItem("cart", JSON.stringify(cart));
                renderItems(cartItemsContainer, cart);
                calculateTotal();
            });
        });

       
        container.querySelectorAll(".minus").forEach(btn => {
            btn.addEventListener("click", () => {
                let i = btn.dataset.index;
                cart[i].quantity = (cart[i].quantity || 1) - 1;
                if(cart[i].quantity <= 0) cart.splice(i,1);
                localStorage.setItem("cart", JSON.stringify(cart));
                renderItems(cartItemsContainer, cart);
                calculateTotal();
            });
        });

   
        container.querySelectorAll(".remove").forEach(btn => {
            btn.addEventListener("click", () => {
                let i = btn.dataset.index;
                cart.splice(i,1);
                localStorage.setItem("cart", JSON.stringify(cart));
                renderItems(cartItemsContainer, cart);
                calculateTotal();
            });
        });
    } else {
       
        container.querySelectorAll(".unlike").forEach(btn => {
            btn.addEventListener("click", () => {
                let i = btn.dataset.index;
                liked.splice(i,1); 
                localStorage.setItem("liked", JSON.stringify(liked));
                renderItems(likedItemsContainer, liked, false); 
            });
        });
    }
}


function calculateTotal() {
    let total = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
    totalPriceEl.innerText = "$" + total.toFixed(2);
}


renderItems(cartItemsContainer, cart);
renderItems(likedItemsContainer, liked, false);
calculateTotal();