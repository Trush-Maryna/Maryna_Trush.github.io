document.addEventListener('DOMContentLoaded', function() {
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

            productDiv.textContent = `${product.name} • ${product.price} грн`;
            productImage.src = product.image; 

            productsListDiv.appendChild(productImage);
            productsListDiv.appendChild(productDiv);
        });
    } catch (error) {
        console.error('Error loading products:', error);
    }
}