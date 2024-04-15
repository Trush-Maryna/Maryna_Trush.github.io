const fetch = require('node-fetch');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const dom = new JSDOM();
const { document } = dom.window;

let tg = global.Telegram.WebApp;
tg.expand();

document.addEventListener("DOMContentLoaded", () => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        document.body.classList.remove('dark-theme');
        document.body.classList.add('light-theme');
    }

    let editButton = document.getElementById("edit-button");
    editButton.addEventListener("click", () => {
        window.location.href = "antibiotiki.html";
    });

    let totalPrice = 0;

    let basketTable = document.getElementById("basket-table");
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems.forEach((product) => {
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

        cell4.querySelector(".delete-button").addEventListener("click", () => {
            let rowIndex = cell4.parentElement.rowIndex;
            let deletedProduct = cartItems.splice(rowIndex, 1)[0];
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            cell4.parentElement.remove();
            updateTotalPrice();
        });
    });

    let deliverySummary = document.getElementById("delivery-summary");

    function updateDeliverySummary() {
        let totalItems = 0;
        cartItems.forEach((product) => {
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
    let deliveryAddressButton = document.getElementById("deliveryAddress");

    function updateDeliveryButton() {
        if (pickupCheckbox.checked || deliveryCheckbox.checked) {
            payButton.textContent = `Оплатити ${totalPrice} грн`;
        } else {
            payButton.textContent = "Оберіть доставку";
        }
    }

    pickupCheckbox.addEventListener("change", () => {
        if (pickupCheckbox.checked) {
            deliveryAddressButton.style.display = "none";
            deliveryCheckbox.checked = false;
            showUkraineMap();
        } else {
            deliveryAddressButton.style.display = "none";
        }
        updateDeliveryButton();
    });

    deliveryCheckbox.addEventListener("change", () => {
        if (deliveryCheckbox.checked) {
            deliveryAddressButton.style.display = "flex";
            pickupCheckbox.checked = false;
            hideUkraineMap();
        } else {
            deliveryAddressButton.style.display = "none";
        }
        updateDeliveryButton();
    });

    deliveryAddressButton.addEventListener("click", () => {
        window.location.href = "deliveryAddress.html";
    });

    let deleteButtons = document.querySelectorAll(".delete-button");
    deleteButtons.forEach((button) => {
        button.addEventListener("click", () => {
            let rowIndex = button.parentElement.parentElement.rowIndex;
            if (rowIndex >= 0 && rowIndex < cartItems.length) {
                let deletedProduct = cartItems[rowIndex];
                deletedProduct.quantity--;
                if (deletedProduct.quantity === 0) {
                    cartItems.splice(rowIndex, 1);
                }
                localStorage.setItem('cartItems', JSON.stringify(cartItems));
                button.parentElement.parentElement.remove();
                updateTotalPrice();
            }
        });
    });

    payButton.addEventListener("click", () => {
        const orderInfo = `ПІБ: ${savedDeliveryData.name}\nОбласть: ${savedDeliveryData.region}\nМісто: ${savedDeliveryData.city}\nВідділення: ${savedDeliveryData.office}\n\nЗамовлення:\n${itemsDescription}\nЗагальна ціна: ${totalPrice} грн`;

        fetch('/send-order-message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ orderInfo: orderInfo })
        }).then(response => {
            if (response.ok) {
                console.log('Order message sent successfully');
            } else {
                console.error('Failed to send order message');
            }
        }).catch(error => {
            console.error('Error sending order message:', error);
        });
    });

    function updateTotalPrice() {
        totalPrice = 0;
        cartItems.forEach((product) => {
            totalPrice += product.price * product.quantity;
        });
        updateDeliveryButton();
        updateDeliverySummary();
    }

    function showUkraineMap() {
        // Код для відображення карти України
    }

    function hideUkraineMap() {
        // Код для приховування карти України
    }
});

let usercard = document.getElementById("usercard");
let p = document.createElement("p");
p.innerText = `${tg.initDataUnsafe.user.first_name}
${tg.initDataUnsafe.user.last_name}`;
usercard.appendChild(p);