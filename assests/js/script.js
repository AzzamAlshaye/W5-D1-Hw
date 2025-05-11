async function fetchAndDisplayProducts() {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    // 3. Parse JSON
    const products = await response.json();

    // 4. Get the container
    const container = document.getElementById("container");

    // 5. Loop through each product and build a card
    products.forEach((product) => {
      const card = document.createElement("div");
      card.classList.add("product-card");

      // Image
      const img = document.createElement("img");
      img.src = product.image;
      img.alt = product.title;
      card.appendChild(img);

      // Title
      const title = document.createElement("div");
      title.classList.add("title");
      title.textContent = product.title;
      card.appendChild(title);

      // Price
      const price = document.createElement("div");
      price.classList.add("price");
      price.textContent = `$${product.price.toFixed(2)}`;
      card.appendChild(price);

      // Append to container
      container.appendChild(card);
    });
  } catch (err) {
    console.error("Failed to fetch products:", err);
  }
}

// 6. Run after DOM is loaded
document.addEventListener("DOMContentLoaded", fetchAndDisplayProducts);
