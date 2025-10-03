<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Product Catalog Viewer</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      padding: 20px;
      background: #f9f9f9;
    }
    h1 {
      text-align: center;
    }
    #productContainer {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      margin-top: 20px;
    }
    .product-card {
      background: white;
      padding: 15px;
      border-radius: 8px;
      box-shadow: 0 2px 6px rgba(0,0,0,0.1);
    }
    .product-card h2 {
      margin: 0 0 10px;
      font-size: 1.2em;
      color: #333;
    }
    .product-card p {
      margin: 5px 0;
      color: #555;
    }
    .price {
      font-weight: bold;
      color: green;
    }
    .error {
      color: red;
      font-weight: bold;
      text-align: center;
      margin-top: 20px;
    }
  </style>
</head>
<body>
  <h1>🛒 Product Catalog</h1>
  <div id="productContainer"></div>
  <div id="errorMsg" class="error"></div>

  <!-- External JS -->
  <script src="script.js"></script>
</body>
</html>                    productDiv.appendChild(productName);
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
