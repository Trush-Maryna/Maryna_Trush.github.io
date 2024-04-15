const fetch = require('node-fetch');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const dom = new JSDOM();
const { document } = dom.window;

document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
});

async function loadProducts() {
    try {
        const response = await fetch('https://trush-maryna.github.io/Maryna_Trush.github.io/products.json');
        const products = await response.json();

        const productContainers = document.querySelectorAll('.item');
        productContainers.forEach((productContainer, index) => {
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

            addToCartBtn.addEventListener('click', () => {
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

            plusBtn.addEventListener('click', () => {
                quantity++;
                quantityText.textContent = quantity;
                updateMainButtonVisibility();
                let itemName = product.name;
                updateItemQuantity(itemName, quantity);
            });

            minusBtn.addEventListener('click', () => {
                if (quantity > 1) {
                    quantity--;
                    quantityText.textContent = quantity;
                    updateMainButtonVisibility();
                    let itemName = product.name;
                    updateItemQuantity(itemName, quantity);
                }
            });

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