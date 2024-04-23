document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
});

window.addEventListener('popstate', function() {
    loadProducts();
});

async function loadProducts() {
    try {
        const response = await fetch('https://trush-maryna.github.io/Maryna_Trush.github.io/products.json');
        const products = await response.json();
        let startIndex, endIndex;
        if (window.location.href.includes("antibiotiki.html") || window.location.href.includes("antibiotiki_menu.html")) {
            startIndex = 0;
            endIndex = 5;
        } else if(window.location.href.includes("colds.html") || window.location.href.includes("colds_menu.html")){
            startIndex = 6;
            endIndex = 11;
        }
        const productContainers = document.querySelectorAll('.item');
        let productIndex = 0; 
        productContainers.forEach((productContainer, index) => {
            if (index >= startIndex && index <= endIndex && products[index]) { 
                const product = products[index];
                const productsListDiv = productContainer.querySelector('.productsList');
                const productDiv = document.createElement('div');
                const productImage = document.createElement('img');

                productDiv.innerHTML = `<span class="productName">${product.name}</span> <br>
                                        <span class="productDescr">${product.descr}</span> <br>
                                        <span class="productPrice">${product.price} грн</span>`;
                productImage.src = product.image;

                productsListDiv.appendChild(productImage);
                productsListDiv.appendChild(productDiv);

                const addToCartBtn = productContainer.querySelector('.add-to-cart-btn');
                const quantityText = productContainer.querySelector('.quantity-text');

                addToCartBtn.addEventListener('click', function() {
                    const quantity = parseInt(quantityText.textContent);
                    const selectedItem = {
                        name: product.name,
                        descr: product.descr,
                        price: product.price,
                        image: product.image,
                        quantity: quantity
                    };
                    addToCart(selectedItem);
                });

                const plusBtn = productContainer.querySelector('.plus-btn');
                const minusBtn = productContainer.querySelector('.minus-btn');

                let quantity = 1;

                plusBtn.addEventListener('click', function() {
                    quantity++;
                    quantityText.textContent = quantity;
                    updateMainButtonVisibility();
                    let itemName = product.name;
                    updateItemQuantity(itemName, quantity);
                });

                minusBtn.addEventListener('click', function() {
                    if (quantity > 1) {
                        quantity--;
                        quantityText.textContent = quantity;
                        updateMainButtonVisibility();
                        let itemName = product.name;
                        updateItemQuantity(itemName, quantity);
                    }
                });
                productIndex++;
            }

        });
    } catch (error) {
        console.error('Error loading products:', error);
    }
}

function addToCart(item) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems.push(item);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

function updateItemQuantity(name, quantity) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems.forEach(item => {
        if (item.name === name) {
            item.quantity = quantity;
        }
    });
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

function updateMainButtonVisibility() {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    if (cartItems.length > 0) {
        tg.MainButton.setText(`Подивитися замовлення`);
        tg.MainButton.show();
    }
}
