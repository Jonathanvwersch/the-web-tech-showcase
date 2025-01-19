// State management
const store = {
  products: [],
  cart: [],
  loading: false,
  async fetchProducts() {
    this.loading = true;
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));
    this.products = [
      { id: 1, name: "Laptop", price: 999, stock: 5 },
      { id: 2, name: "Phone", price: 699, stock: 8 },
      { id: 3, name: "Tablet", price: 499, stock: 2 },
    ];
    this.loading = false;
  },
  addToCart(productId) {
    const product = this.products.find((p) => p.id === productId);
    if (product && product.stock > 0) {
      product.stock--;
      this.cart.push({ ...product });
      return true;
    }
    return false;
  },
};

// Page content with dynamic data
const pages = {
  home: `
    <div class="card" style="margin-top: 2rem;">
      <div class="card-header">
        <h2>Technology Stack</h2>
      </div>
      <div class="feature-list">
        <div class="feature-item">
          <h3>Frontend</h3>
          <div class="features">
            <div class="feature">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 1.6a6.4 6.4 0 1 0 0 12.8A6.4 6.4 0 0 0 8 1.6ZM.8 8a7.2 7.2 0 1 1 14.4 0A7.2 7.2 0 0 1 .8 8Z" fill="currentColor"/>
                <path d="M11.4 5.4a.4.4 0 0 1 0 .57L7.7 9.66a.4.4 0 0 1-.57 0L4.6 7.13a.4.4 0 1 1 .57-.57l2.25 2.25 3.43-3.42a.4.4 0 0 1 .57 0Z" fill="currentColor"/>
              </svg>
              <span>HTML5</span>
            </div>
            <div class="feature">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 1.6a6.4 6.4 0 1 0 0 12.8A6.4 6.4 0 0 0 8 1.6ZM.8 8a7.2 7.2 0 1 1 14.4 0A7.2 7.2 0 0 1 .8 8Z" fill="currentColor"/>
                <path d="M11.4 5.4a.4.4 0 0 1 0 .57L7.7 9.66a.4.4 0 0 1-.57 0L4.6 7.13a.4.4 0 1 1 .57-.57l2.25 2.25 3.43-3.42a.4.4 0 0 1 .57 0Z" fill="currentColor"/>
              </svg>
              <span>JavaScript</span>
            </div>
          </div>
        </div>
        <div class="feature-item">
          <h3>Backend</h3>
          <div class="features">
            <div class="feature">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 1.6a6.4 6.4 0 1 0 0 12.8A6.4 6.4 0 0 0 8 1.6ZM.8 8a7.2 7.2 0 1 1 14.4 0A7.2 7.2 0 0 1 .8 8Z" fill="currentColor"/>
                <path d="M11.4 5.4a.4.4 0 0 1 0 .57L7.7 9.66a.4.4 0 0 1-.57 0L4.6 7.13a.4.4 0 1 1 .57-.57l2.25 2.25 3.43-3.42a.4.4 0 0 1 .57 0Z" fill="currentColor"/>
              </svg>
              <span>Express.js</span>
            </div>
            <div class="feature">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 1.6a6.4 6.4 0 1 0 0 12.8A6.4 6.4 0 0 0 8 1.6ZM.8 8a7.2 7.2 0 1 1 14.4 0A7.2 7.2 0 0 1 .8 8Z" fill="currentColor"/>
                <path d="M11.4 5.4a.4.4 0 0 1 0 .57L7.7 9.66a.4.4 0 0 1-.57 0L4.6 7.13a.4.4 0 1 1 .57-.57l2.25 2.25 3.43-3.42a.4.4 0 0 1 .57 0Z" fill="currentColor"/>
              </svg>
              <span>Client Routing</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        <h2>Request Flow</h2>
      </div>
      <div class="flow">
        <div class="flow-step">
          <div class="flow-number">1</div>
          <div class="flow-content">
            <h3>Initial Load</h3>
            <p>Browser loads the application shell</p>
          </div>
        </div>
        <div class="flow-step">
          <div class="flow-number">2</div>
          <div class="flow-content">
            <h3>Client Routing</h3>
            <p>JavaScript handles navigation without server requests</p>
          </div>
        </div>
        <div class="flow-step">
          <div class="flow-number">3</div>
          <div class="flow-content">
            <h3>Content Update</h3>
            <p>DOM updates instantly with new content</p>
          </div>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        <h2>See for Yourself</h2>
      </div>
      <div class="flow">
        <div class="flow-step">
          <div class="flow-number">1</div>
          <div class="flow-content">
            <h3>Open DevTools</h3>
            <p>Press F12 or right-click and select "Inspect"</p>
          </div>
        </div>
        <div class="flow-step">
          <div class="flow-number">2</div>
          <div class="flow-content">
            <h3>Network Tab</h3>
            <p>Click the Network tab and clear the log</p>
          </div>
        </div>
        <div class="flow-step">
          <div class="flow-number">3</div>
          <div class="flow-content">
            <h3>Navigate</h3>
            <p>Click links and notice no new page requests</p>
          </div>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        <h2>Advantages</h2>
      </div>
      <div class="feature-list">
        <div class="feature-item">
          <div class="feature">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 1.6a6.4 6.4 0 1 0 0 12.8A6.4 6.4 0 0 0 8 1.6ZM.8 8a7.2 7.2 0 1 1 14.4 0A7.2 7.2 0 0 1 .8 8Z" fill="currentColor"/>
              <path d="M11.4 5.4a.4.4 0 0 1 0 .57L7.7 9.66a.4.4 0 0 1-.57 0L4.6 7.13a.4.4 0 1 1 .57-.57l2.25 2.25 3.43-3.42a.4.4 0 0 1 .57 0Z" fill="currentColor"/>
            </svg>
            <span>Smooth Navigation</span>
          </div>
          <p>No page reloads mean instant transitions between views</p>
        </div>
        <div class="feature-item">
          <div class="feature">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 1.6a6.4 6.4 0 1 0 0 12.8A6.4 6.4 0 0 0 8 1.6ZM.8 8a7.2 7.2 0 1 1 14.4 0A7.2 7.2 0 0 1 .8 8Z" fill="currentColor"/>
              <path d="M11.4 5.4a.4.4 0 0 1 0 .57L7.7 9.66a.4.4 0 0 1-.57 0L4.6 7.13a.4.4 0 1 1 .57-.57l2.25 2.25 3.43-3.42a.4.4 0 0 1 .57 0Z" fill="currentColor"/>
            </svg>
            <span>State Management</span>
          </div>
          <p>Maintain application state between page transitions</p>
        </div>
        <div class="feature-item">
          <div class="feature">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 1.6a6.4 6.4 0 1 0 0 12.8A6.4 6.4 0 0 0 8 1.6ZM.8 8a7.2 7.2 0 1 1 14.4 0A7.2 7.2 0 0 1 .8 8Z" fill="currentColor"/>
              <path d="M11.4 5.4a.4.4 0 0 1 0 .57L7.7 9.66a.4.4 0 0 1-.57 0L4.6 7.13a.4.4 0 1 1 .57-.57l2.25 2.25 3.43-3.42a.4.4 0 0 1 .57 0Z" fill="currentColor"/>
            </svg>
            <span>Rich Interactivity</span>
          </div>
          <p>Dynamic updates and complex user interactions</p>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        <h2>Disadvantages</h2>
      </div>
      <div class="feature-list">
        <div class="feature-item">
          <div class="feature">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 1.6a6.4 6.4 0 1 0 0 12.8A6.4 6.4 0 0 0 8 1.6ZM.8 8a7.2 7.2 0 1 1 14.4 0A7.2 7.2 0 0 1 .8 8Z" fill="currentColor"/>
              <path d="M11.4 5.4a.4.4 0 0 1 0 .57L7.7 9.66a.4.4 0 0 1-.57 0L4.6 7.13a.4.4 0 1 1 .57-.57l2.25 2.25 3.43-3.42a.4.4 0 0 1 .57 0Z" fill="currentColor"/>
            </svg>
            <span>Initial Load Time</span>
          </div>
          <p>Must download and parse JavaScript before content is interactive</p>
        </div>
        <div class="feature-item">
          <div class="feature">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 1.6a6.4 6.4 0 1 0 0 12.8A6.4 6.4 0 0 0 8 1.6ZM.8 8a7.2 7.2 0 1 1 14.4 0A7.2 7.2 0 0 1 .8 8Z" fill="currentColor"/>
              <path d="M11.4 5.4a.4.4 0 0 1 0 .57L7.7 9.66a.4.4 0 0 1-.57 0L4.6 7.13a.4.4 0 1 1 .57-.57l2.25 2.25 3.43-3.42a.4.4 0 0 1 .57 0Z" fill="currentColor"/>
            </svg>
            <span>SEO Challenges</span>
          </div>
          <p>Search engines may struggle with JavaScript-rendered content</p>
        </div>
        <div class="feature-item">
          <div class="feature">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 1.6a6.4 6.4 0 1 0 0 12.8A6.4 6.4 0 0 0 8 1.6ZM.8 8a7.2 7.2 0 1 1 14.4 0A7.2 7.2 0 0 1 .8 8Z" fill="currentColor"/>
              <path d="M11.4 5.4a.4.4 0 0 1 0 .57L7.7 9.66a.4.4 0 0 1-.57 0L4.6 7.13a.4.4 0 1 1 .57-.57l2.25 2.25 3.43-3.42a.4.4 0 0 1 .57 0Z" fill="currentColor"/>
            </svg>
            <span>Complex Architecture</span>
          </div>
          <p>More moving parts and potential points of failure</p>
        </div>
      </div>
    </div>
  `,
  about: `
    <div class="card" style="margin-top: 2rem;">
      <div class="flow">
        <div class="flow-step">
          <div class="flow-number">1</div>
          <div class="flow-content">
            <h3>Hash Change</h3>
            <p>URL changed to #about</p>
          </div>
        </div>
        <div class="flow-step">
          <div class="flow-number">2</div>
          <div class="flow-content">
            <h3>Client Update</h3>
            <p>JavaScript swapped the page content</p>
          </div>
        </div>
        <div class="flow-step">
          <div class="flow-number">3</div>
          <div class="flow-content">
            <h3>No Server Request</h3>
            <p>Everything happened in the browser</p>
          </div>
        </div>
      </div>
    </div>
  `,
  more: `
    <div class="card" style="margin-top: 2rem;">
      <div class="flow">
        <div class="flow-step">
          <div class="flow-number">1</div>
          <div class="flow-content">
            <h3>Hash Change</h3>
            <p>URL changed to #more</p>
          </div>
        </div>
        <div class="flow-step">
          <div class="flow-number">2</div>
          <div class="flow-content">
            <h3>Client Update</h3>
            <p>JavaScript swapped the page content</p>
          </div>
        </div>
        <div class="flow-step">
          <div class="flow-number">3</div>
          <div class="flow-content">
            <h3>No Server Request</h3>
            <p>Everything happened in the browser</p>
          </div>
        </div>
      </div>
    </div>
  `,
};

function handleRoute() {
  const hash = window.location.hash.slice(1) || "home";
  document.getElementById("content").innerHTML = pages[hash];

  // Update active nav link
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("data-page") === hash) {
      link.classList.add("active");
    }
  });
}

window.addEventListener("hashchange", handleRoute);
window.addEventListener("load", handleRoute);
