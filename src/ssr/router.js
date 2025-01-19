import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const router = express.Router();

const initialState = {
  products: [
    { id: 1, name: "Laptop", price: 999, stock: 5 },
    { id: 2, name: "Phone", price: 699, stock: 8 },
    { id: 3, name: "Tablet", price: 499, stock: 2 },
  ],
};

const renderProduct = (product) => `
  <div class="product">
    <div class="product-header">
      <h2>${product.name}</h2>
      <div class="price">$${product.price}</div>
    </div>
    <div class="stock">Stock: ${product.stock}</div>
    <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
  </div>`;

const renderPage = (content, state, currentPage = "home") => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SSR Demo</title>
  <link rel="stylesheet" href="/ssr/styles.css">
</head>
<body>
  <div class="container">
    <header>
      <h1>SSR Demo</h1>
      <p class="subtitle">The server renders HTML, then JavaScript hydrates it for interactivity and optional prefetching</p>
    </header>

    <nav class="card" style="margin-bottom: 2rem;">
      <div class="nav-links">
        <a href="/ssr/" class="nav-link ${
          currentPage === "home" ? "active" : ""
        }" data-page="home">
          <span>Home</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M6.7 12.7L10.7 8l-4-4.7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </a>
        <a href="/ssr/about" class="nav-link ${
          currentPage === "about" ? "active" : ""
        }" data-page="about">
          <span>About</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M6.7 12.7L10.7 8l-4-4.7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </a>
      </div>
      <div class="prefetch-toggle">
        <label class="toggle">
          <input type="checkbox" id="prefetch-toggle">
          <span class="toggle-text">Prefetch on hover (fetches resources for page on hover for faster load times)</span>
        </label>
      </div>
    </nav>

    <main id="content">${content}</main>

    <footer>
      <a href="/" class="back-link">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M6.7 12.7L2 8l4.7-4.7M2.7 8h11.3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        Back to Home
      </a>
    </footer>
  </div>

  <script>window.__INITIAL_STATE__ = ${JSON.stringify(state)}</script>
  <script type="module" src="/ssr/client.js"></script>
</body>
</html>`;

router.use(express.static(path.join(__dirname, "public")));

router.get("/", (_, res) => {
  const products = initialState.products.map(renderProduct).join("");
  const total = `
    <div class="total">
      <div class="total-info">
        <h2>Total</h2>
        <div class="total-price">$0</div>
      </div>
    </div>`;

  res.send(renderPage(products + total, initialState, "home"));
});

router.get("/about", (_, res) => {
  const content = `
    <div class="technical-overview">
      <h2>About SSR</h2>
      <ul>
        <li>Initial HTML is rendered on the server</li>
        <li>JavaScript hydrates the page for interactivity</li>
        <li>Combines benefits of server rendering and client interactivity</li>
        <li>Optional prefetching for improved performance</li>
      </ul>
    </div>`;

  res.send(renderPage(content, initialState, "about"));
});

export default router;
