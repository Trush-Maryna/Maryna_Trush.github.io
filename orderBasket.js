function getProductPrice(productId, products) {
    const product = products.find(product => product.id === productId);
    return product ? product.price : 0;
}

document.addEventListener("DOMContentLoaded", function() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        document.body.classList.remove('dark-theme');
        document.body.classList.add('light-theme');
        
    }

    let editButton = document.getElementById("edit-button");
    editButton.addEventListener("click", function() {
        window.location.href = "antibiotiki.html";
    });

    let selectedItems = JSON.parse(localStorage.getItem("selectedItems"));
    let userName = localStorage.getItem("userName");
    if (selectedItems) {
        let basketTable = document.getElementById("basket-table");
        let totalPrice = 0;

        fetch('https://trush-maryna.github.io/Maryna_Trush.github.io/products.json')
            .then(response => response.json())
            .then(products => {
                selectedItems.forEach((item, index) => {
                    let row = basketTable.insertRow(-1);
                    let cell1 = row.insertCell(0);
                    let cell2 = row.insertCell(1);
                    let cell3 = row.insertCell(2);
                    let cell4 = row.insertCell(3);

                    let itemName = item.name;
                    cell1.innerHTML = `<img src="${item.image}" alt="Товар" class="img">`;
                    cell2.innerHTML = `<span class="quantity">${item.quantity}x</span>`;
                    
                    let itemPrice = getProductPrice(item.id, products);
                    
                    cell3.innerHTML = `<span class="price">${itemPrice * item.quantity} грн</span>`;
                    cell4.innerHTML = `<button class="delete-button">X</button>`;
                    totalPrice += itemPrice * item.quantity;

                    cell4.querySelector(".delete-button").addEventListener("click", function() {
                        basketTable.deleteRow(row.rowIndex);
                    });
                });

                let payButton = document.getElementById("pay-button");
                payButton.textContent = `Оплатити ${totalPrice} грн`;

                let usercard = document.getElementById("usercard");
                if (usercard) {
                    let p = document.createElement("p");
                    p.innerText = userName;
                    usercard.appendChild(p);
                }
            })
            .catch(error => console.error('Помилка отримання товарів:', error));
    }
});
