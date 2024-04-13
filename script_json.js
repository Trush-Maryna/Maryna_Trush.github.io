document.addEventListener("DOMContentLoaded", function() {
    let editButton = document.getElementById("edit-button");
    editButton.addEventListener("click", function() {
        window.location.href = "antibiotiki.html";
    });

    loadProducts();
    updateBasket();
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
        });
    } catch (error) {
        console.error('Error loading products:', error);
    }
}