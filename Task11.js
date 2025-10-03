<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Product Catalog</title>
    <style>
        body {
            font-family: Arial, sans-serif;
        }
        .product {
            border: 1px solid #ccc;
            padding: 15px;
            margin: 10px 0;
            border-radius: 5px;
            background-color: #f9f9f9;
        }
        .product h2 {
            margin: 0;
            font-size: 1.5em;
        }
        .product p {
            margin: 5px 0;
        }
        .error {
            color: red;
            font-weight: bold;
        }
    </style>
</head>
<body>

    <h1>Product Catalog</h1>

    <div id="error-message" class="error" style="display: none;"></div>

    <div id="product-list"></div>

    <script>
        document.addEventListener("DOMContentLoaded", () => {
            const productListContainer = document.getElementById('product-list');
            const errorMessageContainer = document.getElementById('error-message');

            async function fetchProducts() {
                try {
                    const response = await fetch('products.json'); 
                    if (!response.ok) {
                        throw new Error('Failed to fetch products');
                    }
                    const products = await response.json();            
                    errorMessageContainer.style.display = 'none';      
                    displayProducts(products);

                } catch (error) {
                    // Handle errors (fetching or parsing issues)
                    console.error("Error:", error.message);
                    errorMessageContainer.textContent = "Failed to load products. Please try again later.";
                    errorMessageContainer.style.display = 'block';
                }
            }

            function displayProducts(products) {
                productListContainer.innerHTML = '';
                products.forEach(product => {
                    const productDiv = document.createElement('div');
                    productDiv.classList.add('product');

                    const productName = document.createElement('h2');
                    productName.textContent = product.name;

                    const productPrice = document.createElement('p');
                    productPrice.textContent = `Price: $${product.price.toFixed(2)}`;

                    const productDescription = document.createElement('p');
                    productDescription.textContent = product.description;
                    productDiv.appendChild(productName);
                    productDiv.appendChild(productPrice);
                    productDiv.appendChild(productDescription);
                    productListContainer.appendChild(productDiv);
                });
            }
            fetchProducts();
        });
    </script>

</body>
</html>
