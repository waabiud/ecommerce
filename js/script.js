/* script.js */
document.addEventListener("DOMContentLoaded", function() {
  // Update cart count on page load
  updateCartCount();
  // Update nav links based on login status
  updateAuthLinks();

  // Contact form submission handling
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Thank you for your message! We will get back to you soon.');
      contactForm.reset();
    });
  }
  
  // Add to Cart functionality
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  addToCartButtons.forEach(button => {
    button.addEventListener('click', function() {
      const productCard = button.closest('.product-card');
      const name = productCard.querySelector('h3').textContent;
      const priceText = productCard.querySelector('.price').textContent;
      const price = parseFloat(priceText.replace('$', ''));
      const img = productCard.querySelector('img').src;
      
      const product = { name, price, img, quantity: 1 };
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      const existingProductIndex = cart.findIndex(item => item.name === product.name);
      if (existingProductIndex !== -1) {
        cart[existingProductIndex].quantity += 1;
      } else {
        cart.push(product);
      }
      localStorage.setItem('cart', JSON.stringify(cart));
      updateCartCount();
      alert(`${product.name} added to cart!`);
    });
  });

  // Login form submission handling
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const email = document.getElementById('loginEmail').value;
      localStorage.setItem("loggedInUser", JSON.stringify({ email: email }));
      alert(`Logged in as ${email}`);
      window.location.href = "profile.html";
    });
  }

  // Register form submission handling
  const registerForm = document.getElementById('registerForm');
  if (registerForm) {
    registerForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const email = document.getElementById('registerEmail').value;
      const password = document.getElementById('registerPassword').value;
      const confirmPassword = document.getElementById('confirmPassword').value;
      if (password !== confirmPassword) {
        alert('Passwords do not match!');
      } else {
        // In a real app, register the user on the server.
        localStorage.setItem("loggedInUser", JSON.stringify({ email: email }));
        alert(`Registered with ${email}`);
        window.location.href = "profile.html";
      }
    });
  }

  // Logout button handling
  const logoutBtn = document.getElementById('logout');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function(e) {
      e.preventDefault();
      localStorage.removeItem("loggedInUser");
      alert("You have been logged out.");
      window.location.href = "index.html";
    });
  }

  // Profile page: display user info
  const profileInfo = document.getElementById('profile-info');
  if (profileInfo) {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!user) {
      window.location.href = "login.html";
    } else {
      profileInfo.innerHTML = `<p>You are logged in as <strong>${user.email}</strong>.</p>`;
    }
  }
});

// Function to update the cart count displayed in the navbar
function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  let count = cart.reduce((total, item) => total + item.quantity, 0);
  const cartCountElement = document.getElementById('cart-count');
  if (cartCountElement) {
    cartCountElement.textContent = count;
  }
}

// Function to update authentication links in the navbar
function updateAuthLinks() {
  const navLinks = document.getElementById('nav-links');
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  if (navLinks) {
    // If the user is logged in, replace Login and Register with Profile and Logout
    if (user) {
      navLinks.innerHTML = `
        <li><a href="index.html">Home</a></li>
        <li><a href="contact.html">Contact</a></li>
        <li><a href="profile.html">Profile</a></li>
        <li><a href="#" id="logout">Logout</a></li>
        <li><a href="#">Cart (<span id="cart-count">${getCartCount()}</span>)</a></li>
      `;
      // Reattach logout event listener
      const logoutBtn = document.getElementById('logout');
      if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
          e.preventDefault();
          localStorage.removeItem("loggedInUser");
          alert("You have been logged out.");
          window.location.href = "index.html";
        });
      }
    }
  }
}

function getCartCount() {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  return cart.reduce((total, item) => total + item.quantity, 0);
}
