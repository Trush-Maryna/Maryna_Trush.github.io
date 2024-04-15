let tg = global.Telegram.WebApp;
tg.expand();
tg.MainButton.textColor = "#FFFFFF";
tg.MainButton.color = "#2cab37";
let selectedItems = [];

let payButton = document.getElementById("pay-button");
payButton.addEventListener("click", function() {
    window.location.href = "orderBasket.html";
});

function updatePayButtonVisibility() {
    let div = document.getElementById("delivery-options");
    if (selectedItems.length > 0) {
        payButton.style.display = "block";
        div.style.display = "block";
    } else {
        payButton.style.display = "none";
        div.style.display = "none";
    }
}

let items = document.querySelectorAll(".item");
items.forEach(item => {
    let quantityText = item.querySelector(".quantity-text");
    let plusBtn = item.querySelector(".plus-btn");
    let minusBtn = item.querySelector(".minus-btn");
    let addToCartBtn = item.querySelector(".add-to-cart-btn");
    let quantityContainer = item.querySelector(".quantity");
    
    addToCartBtn.addEventListener("click", function() {
        quantityContainer.style.display = "inline-block";
        addToCartBtn.style.display = "none";
        let itemName = item.getAttribute("data-item");
        let quantity = parseInt(quantityText.textContent);
        selectedItems.push({ name: itemName, quantity: quantity });
        updatePayButtonVisibility();
    });
    
    plusBtn.addEventListener("click", function() {
        let quantity = parseInt(quantityText.textContent);
        if (!isNaN(quantity)) {
            quantity++;
            quantityText.textContent = quantity;
            updatePayButtonVisibility();
            let itemName = item.getAttribute("data-item");
            updateItemQuantity(itemName, quantity);
        }
    });
    
    minusBtn.addEventListener("click", function() {
        let quantity = parseInt(quantityText.textContent);
        if (!isNaN(quantity) && quantity > 0) {
            quantity--;
            quantityText.textContent = quantity;
            updatePayButtonVisibility();
            let itemName = item.getAttribute("data-item"); 
            updateItemQuantity(itemName, quantity);
        }
    });

    function updateItemQuantity(name, quantity) {
        selectedItems.forEach(item => {
            if (item.name === name) {
                item.quantity = quantity;
            }
        });
        localStorage.setItem("selectedItems", JSON.stringify(selectedItems));
    }
});