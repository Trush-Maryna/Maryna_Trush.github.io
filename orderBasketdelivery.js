let tg = window.Telegram.WebApp;
tg.MainButton.textColor = "#FFFFFF";
tg.MainButton.color = "rgb(91,179,208)";
tg.MainButton.fontSize = "17px";
tg.expand();

document.addEventListener("DOMContentLoaded", function() {
    const pickupCheckbox = document.getElementById('pickup-checkbox');
    let deliveryCheckbox = document.getElementById("delivery-checkbox");
    pickupCheckbox.addEventListener('change', function() {
        if (pickupCheckbox.checked) {
            window.location.href = 'orderBasketpickup.html';
            deliveryCheckbox.style.backgroundColor = "steelblue";
        }
    });

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
            let deletedProduct = cartItems.splice(rowIndex, 1)[0];
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            this.parentElement.parentElement.remove();
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

    let deliveryAddressButton = document.getElementById("deliveryAddress");
    deliveryAddressButton.style.display = "flex";
    tg.MainButton.setText(`Оплатити ${totalPrice} грн`);
    tg.MainButton.show();
    updateTotalPrice();

    deliveryAddressButton.addEventListener("click", function() {
        window.location.href = "deliveryAddress.html";
    });

    let deleteButtons = document.querySelectorAll(".delete-button");
    deleteButtons.forEach(function(button) {
        button.addEventListener("click", function() {
            let rowIndex = this.parentElement.parentElement.rowIndex;
            if (rowIndex>= 0 && rowIndex < cartItems.length) {
                let deletedProduct = cartItems[rowIndex];
                deletedProduct.quantity--; 
                if (deletedProduct.quantity === 0) {
                    cartItems.splice(rowIndex, 1); 
                }
                localStorage.setItem('cartItems', JSON.stringify(cartItems));
                this.parentElement.parentElement.remove();
                updateTotalPrice();
            }
        });
    });

    function updateTotalPrice() {
        totalPrice = 0;
        cartItems.forEach(function(product) {
            totalPrice += product.price * product.quantity;
        });
        updateDeliverySummary();
    }

    Telegram.WebApp.onEvent("mainButtonClicked", function() {
        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        let savedDeliveryData = JSON.parse(localStorage.getItem('deliveryData')) || {};
        
        let orderDetails = [];
        let totalPrice = 0;
        cartItems.forEach(function(product) {
            let itemTotalPrice = product.price * product.quantity;
            totalPrice += itemTotalPrice;
            orderDetails.push({
                name: product.name,
                quantity: product.quantity,
                totalPrice: itemTotalPrice
            });
        });

        let message = {
            type: "order_info",
            data: orderDetails,
            totalPrice: totalPrice,
            customerInfo: {
                fullName: savedDeliveryData.name || '',
                phoneNumber: savedDeliveryData.phone || '',
                region: savedDeliveryData.region || '',
                city: savedDeliveryData.city || '',
                office: savedDeliveryData.office || ''
            }
        };
        
        tg.sendData(JSON.stringify(message));
    });
});

let usercard = document.getElementById("usercard");
let p = document.createElement("p");
p.innerText = `${tg.initDataUnsafe.user.first_name}
${tg.initDataUnsafe.user.last_name}`;
usercard.appendChild(p);