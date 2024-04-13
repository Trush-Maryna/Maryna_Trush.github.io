document.addEventListener("DOMContentLoaded", function() {
    let editButton = document.getElementById("edit-button");
    editButton.addEventListener("click", function() {
        window.location.href = "antibiotiki.html";
    });

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
            let cell4 = row.insertCell(3);

            let itemName = item.name;
            cell1.innerHTML = `<img src="${item.image}" alt="Товар" class="img">`;
            cell2.innerHTML = `<span class="quantity">${item.quantity}x</span>`;
            cell3.innerHTML = `<span class="price">${item.price * item.quantity} грн</span>`;
            cell4.innerHTML = `<button class="delete-button">X</button>`;
            totalPrice += item.price * item.quantity;

            cell4.querySelector(".delete-button").addEventListener("click", function() {
                basketTable.deleteRow(row.rowIndex);
                selectedItems.splice(index, 1);
                localStorage.setItem("selectedItems", JSON.stringify(selectedItems));
                updateTotalPrice();
            });
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
});

function updateTotalPrice() {
    let selectedItems = JSON.parse(localStorage.getItem("selectedItems"));
    let totalPrice = 0;
    selectedItems.forEach(item => {
        totalPrice += item.price * item.quantity;
    });
    let payButton = document.getElementById("pay-button");
    payButton.textContent = `Оплатити ${totalPrice} грн`;
}
