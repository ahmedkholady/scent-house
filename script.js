// Fetch products from Firebase and display them
async function fetchProducts() {
  try {
      const querySnapshot = await getDocs(collection(db, "products"));
      const container = document.getElementById('all-products-container');
      
      // Check if container exists
      if (!container) {
          console.error("Container not found!");
          return;
      }

      querySnapshot.forEach((doc) => {
          const product = doc.data();
          
          // Validate product data
          if (!product || !product.name || !product.image || !product.price) {
              console.error("Invalid product data:", product);
              return;
          }

          displayProduct(product); // Display each product on the page
      });
  } catch (error) {
      console.error("Error fetching products: ", error);
  }
}

// Display a product on the page
function displayProduct(product) {
  const container = document.getElementById('all-products-container');

  // Create a product card
  const card = document.createElement('div');
  card.className = 'product-card';
  card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <p><strong>السعر: ${product.price} جنيه</strong></p>
      <button onclick="addToCart('${product.name}')">أضف للسلة</button>
      <button class="secondary" onclick="buyNow('${product.name}')">اطلب الآن</button>
  `;

  // Add the card to the container
  container.appendChild(card);
}

// Add product to Firebase
function addProduct() {
  const productName = document.getElementById('productName').value;
  const productCategory = document.getElementById('productCategory').value;
  const productImage = document.getElementById('productImage').value;
  const productPrice = document.getElementById('productPrice').value;
  const productDescription = document.getElementById('productDescription').value;

  // Validate input fields
  if (!productName || !productCategory || !productImage || !productPrice || !productDescription) {
      alert('يرجى ملء جميع الحقول!');
      return;
  }

  const newProduct = {
      name: productName,
      category: productCategory,
      image: productImage,
      price: productPrice,
      description: productDescription
  };

  addProductToDatabase(newProduct); // Use Firebase function
  alert("تم إضافة المنتج بنجاح!");
}

// Call fetchProducts when the page loads
window.onload = () => {
  fetchProducts();
};