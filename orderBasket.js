let tg = window.Telegram.WebApp;
tg.expand();
tg.MainButton.textColor = "#FFFFFF";
tg.MainButton.color = "rgb(91,179,208)";
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

    let payButton = document.getElementById("pay-button");
    payButton.textContent = `Оплатити ${totalPrice} грн`;

    let usercard = document.getElementById("usercard");
    if (usercard) {
        let userName = localStorage.getItem("userName");
        let p = document.createElement("p");
        p.innerText = userName;
        usercard.appendChild(p);
    }

    function updateTotalPrice() {
        totalPrice = 0;
        cartItems.forEach(function(product) {
            totalPrice += product.price * product.quantity;
        });
        payButton.textContent = `Оплатити ${totalPrice} грн`;
    }

    function updateMainButtonVisibility() {
        if (cartItems.length > 0) {
            tg.MainButton.setText(`Оплатити ${totalPrice} грн`);
            tg.MainButton.show();
        }
    }
});