document.addEventListener("DOMContentLoaded", function() {
    let selectedItems = JSON.parse(localStorage.getItem("selectedItems"));
    let userName = localStorage.getItem("userName");
    if (selectedItems) {
        let basketTable = document.getElementById("basket-table");
        let totalPrice = 0;

        selectedItems.forEach((item, index) => {
            let row = basketTable.insertRow(-1);
            let cell1 = row.insertCell(0);
            let cell2 = row.insertCell(1);
            let cell3 = row.insertCell(2);

            let itemName = item.name;

            cell1.innerHTML = `<img src="Img/${item.name}.jpg" alt="Товар" class="img">`;
            cell2.innerHTML = `<span class="quantity">${item.quantity}</span>`;
            let itemPrice = 0;
            switch (item.name) {
                case '1':
                    itemPrice = 263;
                    break;
                case '2':
                    itemPrice = 83;
                    break;
                case '3':
                    itemPrice = 111;
                    break;
                case '4':
                    itemPrice = 159;
                    break;
                case '5':
                    itemPrice = 173;
                    break;
                case '6':
                    itemPrice = 106;
                    break;
                default:
                    itemPrice = 0;
            }

            cell3.textContent = `${itemPrice * item.quantity} грн`;
            totalPrice += itemPrice * item.quantity;
        });

        let payButton = document.getElementById("pay-button");
        payButton.textContent = `Оплатити ${totalPrice} грн`;

        let usercard = document.getElementById("usercard");
        if (usercard) {
            let p = document.createElement("p");
            p.innerText = userName;
            usercard.appendChild(p);
        }
    }
});

document.addEventListener("DOMContentLoaded", function() {
    let editButton = document.getElementById("edit-button");
    editButton.addEventListener("click", function() {
        window.history.back();
    });
});
