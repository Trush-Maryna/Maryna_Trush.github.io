document.addEventListener("DOMContentLoaded", function() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        document.body.classList.remove('dark-theme');
        document.body.classList.add('light-theme');
    }

    let editButton = document.getElementById("edit-button");
    editButton.addEventListener("click", function() {
        window.location.href = "antibiotiki.html";
    });

    let totalPrice = 0;

    let basketTable = document.getElementById("basket-table");
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems.forEach(function(product) {
        let row = basketTable.insertRow(-1);
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        let cell4 = row.insertCell(3);

        cell1.innerHTML = `<img src="${product.image}" alt="Товар" class="img">`;
        cell2.innerHTML = `<span class="quantity">${product.quantity}x</span>`;
        cell3.innerHTML = `<span class="price">${product.price * product.quantity} грн</span>`;
        cell4.innerHTML = `<button class="delete-button">X</button>`;
        totalPrice += product.price * product.quantity;

        cell4.querySelector(".delete-button").addEventListener("click", function() {
            let rowIndex = this.parentElement.parentElement.rowIndex;
            basketTable.deleteRow(rowIndex);
            cartItems.splice(rowIndex - 1, 1);
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            updateTotalPrice();
        });
    });

    let deliverySummary = document.getElementById("delivery-summary");

    function updateDeliverySummary() {
        let totalItems = 0;
        cartItems.forEach(function(product) {
            totalItems += product.quantity;
        });

        let ending;
        if (totalItems === 1) {
            ending = "товар";
        } else if (totalItems % 10 === 2 || totalItems % 10 === 3 || totalItems % 10 === 4) {
            ending = "товари";
        } else {
            ending = "товарів";
        }

        deliverySummary.innerHTML = `${totalItems} ${ending} на суму: <span class="finalPrice">${totalPrice} грн</span>`;
    }

    updateDeliverySummary();

    let payButton = document.getElementById("pay-button");

    let pickupCheckbox = document.getElementById("pickup-checkbox");
    let deliveryCheckbox = document.getElementById("delivery-checkbox");

    function updateDeliveryButton() {
        if (pickupCheckbox.checked || deliveryCheckbox.checked) {
            payButton.textContent = `Оплатити ${totalPrice} грн`;
        } else {
            payButton.textContent = "Оберіть доставку";
        }
    }

    function updateTotalPrice() {
        totalPrice = 0;
        cartItems.forEach(function(product) {
            totalPrice += product.price * product.quantity;
        });
        updateDeliveryButton();
    }

    pickupCheckbox.addEventListener("change", function() {
        if (pickupCheckbox.checked) {
            deliveryCheckbox.checked = false;
        }
        updateDeliveryButton();
    });

    deliveryCheckbox.addEventListener("change", function() {
        if (deliveryCheckbox.checked) {
            pickupCheckbox.checked = false;
        }
        updateDeliveryButton();
    });
});