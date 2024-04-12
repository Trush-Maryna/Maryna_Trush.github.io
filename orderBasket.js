document.addEventListener("DOMContentLoaded", function() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        document.body.classList.remove('dark-theme');
        document.body.classList.add('light-theme');
        
    }

    let editButton = document.getElementById("edit-button");
    editButton.addEventListener("click", function() {
        window.location.href = "antibiotiki.html";
    });

    loadProducts();
});

async function loadProducts() {
    try {
        const response = await fetch('https://trush-maryna.github.io/Maryna_Trush.github.io/products.json');
        const products = await response.json();

        let selectedItems = JSON.parse(localStorage.getItem("selectedItems")) || [];
        let userName = localStorage.getItem("userName");

        if (selectedItems.length > 0) {
            let basketTable = document.getElementById("basket-table");
            let totalPrice = 0;

            selectedItems.forEach((item, index) => {
                let row = basketTable.insertRow(-1);
                let cell1 = row.insertCell(0);
                let cell2 = row.insertCell(1);
                let cell3 = row.insertCell(2);
                let cell4 = row.insertCell(3);

                let product = products.find(p => p.id === item.id); // Знаходимо товар у списку

                if (product) {
                    cell1.innerHTML = `<img src="${product.image}" alt="${product.name}" class="img">`;
                    cell2.innerHTML = `<span class="quantity">${item.quantity}x</span>`;
                    cell3.innerHTML = `<span class="price">${product.price * item.quantity} грн</span>`;
                    cell4.innerHTML = `<button class="delete-button">X</button>`;
                    totalPrice += product.price * item.quantity;

                    cell4.querySelector(".delete-button").addEventListener("click", function() {
                        basketTable.deleteRow(row.rowIndex);
                        // Після видалення товару з кошика, оновлюємо localStorage та суму
                        selectedItems.splice(index, 1);
                        localStorage.setItem("selectedItems", JSON.stringify(selectedItems));
                        updateTotalPrice();
                    });
                }
            });

            updateTotalPrice();

            let payButton = document.getElementById("pay-button");
            payButton.textContent = `Оплатити ${totalPrice} грн`;

            let usercard = document.getElementById("usercard");
            if (usercard) {
                let p = document.createElement("p");
                p.innerText = userName;
                usercard.appendChild(p);
            }
        }
    } catch (error) {
        console.error('Error loading products:', error);
    }
}

function updateTotalPrice() {
    let totalPrice = 0;
    let rows = document.querySelectorAll("#basket-table tbody tr");
    rows.forEach(row => {
        let priceText = row.querySelector(".price").innerText;
        totalPrice += parseInt(priceText.split(" ")[0]); // Розбиваємо текст на число та валюту, та додаємо до загальної суми
    });

    let payButton = document.getElementById("pay-button");
    payButton.textContent = `Оплатити ${totalPrice} грн`;
}
