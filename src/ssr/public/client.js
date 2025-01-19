const state = {
  cart: new Map(),
  total: 0,
  products: window.__INITIAL_STATE__.products,
  prefetchEnabled: localStorage.getItem("prefetch-enabled") === "true",
};

const formatPrice = (price) => `$${price.toFixed(2)}`;

const updateTotal = () => {
  state.total = Array.from(state.cart.entries()).reduce((sum, [id, qty]) => {
    const product = state.products.find((p) => p.id === id);
    return sum + (product?.price || 0) * qty;
  }, 0);

  document.querySelector(".total-price").textContent = formatPrice(state.total);
};

const addToCart = (id) => {
  const qty = state.cart.get(id) || 0;
  const product = state.products.find((p) => p.id === id);

  if (product && product.stock > qty) {
    state.cart.set(id, qty + 1);
    updateTotal();

    // Update stock display
    const productElement = document
      .querySelector(`[data-id="${id}"]`)
      .closest(".product");
    const stockElement = productElement.querySelector(".stock");
    const remainingStock = product.stock - (qty + 1);
    stockElement.textContent = `Stock: ${remainingStock}`;

    const btn = document.querySelector(`[data-id="${id}"]`);
    btn.classList.add("added");
    setTimeout(() => btn.classList.remove("added"), 200);

    // Disable button if no stock left
    if (remainingStock === 0) {
      btn.disabled = true;
      btn.style.opacity = "0.5";
    }
  }
};

// Enhanced prefetching functionality
const resourceCache = new Map();

const extractResources = (html) => {
  const doc = new DOMParser().parseFromString(html, "text/html");
  const resources = new Set();

  // Get all resource URLs from the HTML
  doc.querySelectorAll('script[src], link[rel="stylesheet"]').forEach((el) => {
    const url = el.src || el.href;
    if (url) resources.add(url);
  });

  return Array.from(resources);
};

const prefetchResource = async (url) => {
  if (resourceCache.has(url)) return resourceCache.get(url);

  try {
    const response = await fetch(url);
    const content = await (url.endsWith(".js") || url.endsWith(".css")
      ? response.text()
      : response.text());

    resourceCache.set(url, content);
    return content;
  } catch (error) {
    console.warn(`Failed to prefetch ${url}:`, error);
    return null;
  }
};

const prefetchPage = async (url) => {
  if (resourceCache.has(url)) return;

  try {
    // Fetch and cache the HTML
    const response = await fetch(url);
    const html = await response.text();
    resourceCache.set(url, html);

    // Extract and fetch all resources
    const resources = extractResources(html);
    await Promise.all(resources.map(prefetchResource));
  } catch (error) {
    console.warn(`Failed to prefetch ${url}:`, error);
  }
};

const handleNavigation = (event) => {
  const link = event.currentTarget;
  if (!link.href || link.classList.contains("active")) return;

  event.preventDefault();

  if (resourceCache.has(link.href)) {
    // Use cached content
    const cachedHtml = resourceCache.get(link.href);
    const doc = new DOMParser().parseFromString(cachedHtml, "text/html");

    // Update content
    const content = doc.querySelector("#content").innerHTML;
    document.querySelector("#content").innerHTML = content;

    // Update state
    const stateScript = doc.querySelector("script:not([src])");
    if (stateScript) {
      const stateMatch = stateScript.textContent.match(
        /window\.__INITIAL_STATE__\s*=\s*({.*?});/
      );
      if (stateMatch) {
        state.products = JSON.parse(stateMatch[1]).products;
      }
    }

    // Update active state
    document.querySelectorAll(".nav-link").forEach((navLink) => {
      navLink.classList.toggle("active", navLink.href === link.href);
    });

    // Update URL without reload
    history.pushState(null, "", link.href);
  } else {
    // Fallback to normal navigation
    window.location.href = link.href;
  }
};

const setupPrefetching = () => {
  const toggle = document.getElementById("prefetch-toggle");
  toggle.checked = state.prefetchEnabled;

  toggle.addEventListener("change", () => {
    state.prefetchEnabled = toggle.checked;
    localStorage.setItem("prefetch-enabled", toggle.checked);
  });

  // Setup navigation handling
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", handleNavigation);
    link.addEventListener("mouseenter", () => {
      if (state.prefetchEnabled && !link.classList.contains("active")) {
        prefetchPage(link.href);
      }
    });
  });

  // Handle browser back/forward
  window.addEventListener("popstate", () => {
    const currentPath = window.location.pathname;
    const link = document.querySelector(`.nav-link[href="${currentPath}"]`);
    if (link) link.click();
  });
};

// Initialize
document.querySelectorAll(".add-to-cart").forEach((btn) => {
  btn.addEventListener("click", () => addToCart(Number(btn.dataset.id)));
});

setupPrefetching();
