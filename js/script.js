// Get the add to cart buttons
const addToCartButtons = document.querySelectorAll('.add-to-cart');

// Add event listener for add to cart button click
addToCartButtons.forEach((button) => {
  button.addEventListener('click', (e) => {
    // Get the product ID and name
    const productId = button.dataset.productId;
    const productName = button.dataset.productName;

    // Add the product to the cart
    // Your cart logic here
    console.log(`Added ${productName} to cart`);
  });
});

// Get the register form element
const registerForm = document.getElementById('registerForm');

// Add event listener for form submission
registerForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // Get the form data
  const email = document.getElementById('registerEmail').value;
  const password = document.getElementById('registerPassword').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const name = document.getElementById('registerName').value;
  const phone = document.getElementById('registerPhone').value;
  
  // Validate the form data
  if (password!== confirmPassword) {
    document.getElementById('registerError').innerHTML = 'Passwords do not match';
    return;
  }
  
  // Register the user
  fetch('/api/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password,
      name,
      phone
    })
  })
.then((response) => response.json())
.then((data) => {
    if (data.success) {
      window.location.href = 'login.html';
    } else {
      document.getElementById('registerError').innerHTML = data.message;
    }
  })
.catch((error) => {
    console.error(error);
  });
});

// Get the login form element
const loginForm = document.getElementById('loginForm');

// Add event listener for form submission
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // Get the form data
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;
  
  // Login the user
  fetch('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password
    })
  })
.then((response) => response.json())
.then((data) => {
    if (data.success) {
      window.location.href = 'profile.html';
    } else {
      document.getElementById('loginError').innerHTML = data.message;
    }
  })
.catch((error) => {
    console.error(error);
  });
});

// Get the profile info element
const profileInfo = document.getElementById('profile-info');

// Get the profile details
fetch('/api/profile')
.then((response) => response.json())
.then((data) => {
  profileInfo.innerHTML = `
    <h3>Personal Details</h3>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    <p><strong>Phone:</strong> ${data.phone}</p>
    <p><strong>Address:</strong> ${data.address}</p>
    
    <h3>Order History</h3>
    <ul id="order-history">
      ${data.orderHistory.map(order => `
        <li>
          <p><strong>Order ID:</strong> ${order.orderId}</p>
          <p><strong>Order Date:</strong> ${order.orderDate}</p>
          <p><strong>Order Total:</strong> ${order.orderTotal}</p>
        </li>
      `).join('')}
    </ul>
    
    <h3>Account Settings</h3>
    <button id="edit-profile">Edit Profile</button>
    <button id="change-password">Change Password</button>
  `;
})
.catch((error) => {
  console.error(error);
});

// Get the edit profile button
const editProfileButton = document.getElementById('edit-profile');

// Add event listener for edit profile button click
editProfileButton.addEventListener('click', () => {
  // Edit profile logic here
  console.log('Edit profile button clicked');
});

// Get the change password button
const changePasswordButton = document.getElementById('change-password');

// Add event listener for change password button click
changePasswordButton.addEventListener('click', () => {
  // Change password logic here
  console.log('Change password button clicked');
});
