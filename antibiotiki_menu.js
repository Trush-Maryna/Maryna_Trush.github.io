let tg = window.Telegram.WebApp;
tg.expand();
let selectedItems = [];

let items = document.querySelectorAll(".item");
items.forEach(item => {
    let quantityText = item.querySelector(".quantity-text");
    let plusBtn = item.querySelector(".plus-btn");
    let minusBtn = item.querySelector(".minus-btn");
    let addToCartBtn = item.querySelector(".add-to-cart-btn");
    let quantityContainer = item.querySelector(".quantity");
    let itemName = item.getAttribute("data-item");

    addToCartBtn.addEventListener("click", function() {
        quantityContainer.style.display = "inline-block";
        addToCartBtn.style.display = "none";
        let quantity = parseInt(quantityText.textContent);
        selectedItems.push({ name: itemName, quantity: quantity });
        updateItemQuantity(itemName, quantity);
    });

    plusBtn.addEventListener("click", function() {
        let quantity = parseInt(quantityText.textContent);
        if (!isNaN(quantity)) {
            quantity++;
            quantityText.textContent = quantity;
            updateItemQuantity(itemName, quantity);
        }
    });

    minusBtn.addEventListener("click", function() {
        let quantity = parseInt(quantityText.textContent);
        if (!isNaN(quantity) && quantity > 0) {
            quantity--;
            quantityText.textContent = quantity;
            updateItemQuantity(itemName, quantity);
        }
    });
});

function updateItemQuantity(name, quantity) {
    selectedItems.forEach(item => {
        if (item.name === name) {
            item.quantity = quantity;
        }
    });
    localStorage.setItem("selectedItems", JSON.stringify(selectedItems));
}
