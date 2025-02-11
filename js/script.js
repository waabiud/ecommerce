const checkbox = document.getElementById('checkbox');
const menuItems = document.querySelector('.menu-items');

checkbox.addEventListener('change', () => {
    menuItems.classList.toggle('active');
});

// Optional: Close menu on link click
const menuLinks = document.querySelectorAll('.menu-items a');
menuLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuItems.classList.remove('active');
        checkbox.checked = false;
    });
});
