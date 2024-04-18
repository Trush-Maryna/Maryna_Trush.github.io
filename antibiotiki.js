let tg = window.Telegram.WebApp;
tg.expand();
tg.MainButton.textColor = "#FFFFFF";
tg.MainButton.color = "rgb(91,179,208)";
tg.MainButton.fontSize = "17px";
let selectedItems = [];

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
        updateMainButtonVisibility();
    });
    
    plusBtn.addEventListener("click", function() {
        let quantity = parseInt(quantityText.textContent);
        if (!isNaN(quantity)) {
            quantity++;
            quantityText.textContent = quantity;
            updateMainButtonVisibility();
            let itemName = item.getAttribute("data-item");
            updateItemQuantity(itemName, quantity);
        }
    });
    
    minusBtn.addEventListener("click", function() {
        let quantity = parseInt(quantityText.textContent);
        if (!isNaN(quantity) && quantity > 0) {
            quantity--;
            quantityText.textContent = quantity;
            updateMainButtonVisibility();
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

    function updateMainButtonVisibility() {
        if (selectedItems.length > 0) {
            tg.MainButton.setText(`Подивитися замовлення`);
            tg.MainButton.show();
        }
    }
});

Telegram.WebApp.onEvent("mainButtonClicked", function() {
    localStorage.setItem("selectedItems", JSON.stringify(selectedItems));
    tg.MainButton.hide();
    window.location.href = "orderBasket.html";
});