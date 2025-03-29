// Cart functionality
let cart = [];
let total = 0;

// DOM Elements
document.addEventListener('DOMContentLoaded', () => {
    // Remove loading spinner
    const loading = document.querySelector('.loading');
    if (loading) {
        loading.style.display = 'none';
    }

    // Theme toggle functionality
    const themeToggle = document.querySelector('.theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);
    }

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }

    // Header elements
    const searchForm = document.querySelector('.search-form');
    const shoppingCart = document.querySelector('.shopping-cart');
    const loginForm = document.querySelector('.login-form');
    const navbar = document.querySelector('.navbar');
    const cartBtn = document.querySelector('#cart-btn');
    const cartCount = document.querySelector('.cart-count');
    const cartItems = document.querySelector('.shopping-cart .box-container');
    const cartTotal = document.querySelector('.shopping-cart .total');

    // Toggle buttons
    const searchBtn = document.querySelector('#search-btn');
    const loginBtn = document.querySelector('#login-btn');
    const menuBtn = document.querySelector('#menu-btn');

    // Add to cart buttons
    const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');

    // Initialize cart count
    updateCartCount();

    // Search functionality
    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            toggleActiveSection(searchForm);
        });
    }

    // Cart functionality
    if (cartBtn) {
        cartBtn.addEventListener('click', () => {
            toggleActiveSection(shoppingCart);
            updateCartDisplay();
        });
    }

    // Login functionality
    if (loginBtn) {
        loginBtn.addEventListener('click', () => {
            toggleActiveSection(loginForm);
        });
    }

    // Menu functionality
    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            toggleActiveSection(navbar);
        });
    }

    // Add to cart functionality
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const product = e.target.closest('.box');
            const productData = {
                id: product.dataset.id,
                name: product.querySelector('h3').textContent,
                price: parseFloat(product.querySelector('.price').textContent.replace('$', '')),
                image: product.querySelector('img').src,
                quantity: 1
            };
            addToCart(productData);
        });
    });

    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = newsletterForm.querySelector('.email').value;
            if (validateEmail(email)) {
                showNotification('Thank you for subscribing!', 'success');
                newsletterForm.reset();
            } else {
                showNotification('Please enter a valid email address.', 'error');
            }
        });
    }

    // Helper function to toggle active sections
    function toggleActiveSection(activeSection) {
        const sections = [searchForm, shoppingCart, loginForm, navbar];
        sections.forEach(section => {
            if (section !== activeSection) {
                section.classList.remove('active');
            }
        });
        activeSection.classList.toggle('active');
    }

    // Close all active sections on scroll
    window.addEventListener('scroll', () => {
        const sections = [searchForm, shoppingCart, loginForm, navbar];
        sections.forEach(section => {
            section.classList.remove('active');
        });
    });

    // Cart functions
    function addToCart(product) {
        const existingItem = cart.find(item => item.id === product.id);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push(product);
        }
        updateCartCount();
        updateCartDisplay();
        showNotification('Product added to cart!', 'success');
    }

    function removeFromCart(productId) {
        cart = cart.filter(item => item.id !== productId);
        updateCartCount();
        updateCartDisplay();
        showNotification('Product removed from cart!', 'success');
    }

    function updateCartCount() {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
        cartCount.style.display = totalItems > 0 ? 'block' : 'none';
    }

    function updateCartDisplay() {
        if (!cartItems) return;

        cartItems.innerHTML = '';
        total = 0;

        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;

            const itemElement = document.createElement('div');
            itemElement.className = 'box';
            itemElement.innerHTML = `
                <i class="fas fa-trash" data-id="${item.id}"></i>
                <img src="${item.image}" alt="${item.name}" />
                <div class="content">
                    <h3>${item.name}</h3>
                    <span class="price">$${item.price.toFixed(2)}</span>
                    <div class="quantity-controls">
                        <button class="quantity-btn minus" data-id="${item.id}">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="quantity-btn plus" data-id="${item.id}">+</button>
                    </div>
                </div>
            `;
            cartItems.appendChild(itemElement);
        });

        // Add event listeners for quantity controls and delete buttons
        cartItems.querySelectorAll('.quantity-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const productId = e.target.dataset.id;
                const item = cart.find(item => item.id === productId);
                if (e.target.classList.contains('plus')) {
                    item.quantity += 1;
                } else if (e.target.classList.contains('minus')) {
                    if (item.quantity > 1) {
                        item.quantity -= 1;
                    } else {
                        removeFromCart(productId);
                    }
                }
                updateCartCount();
                updateCartDisplay();
            });
        });

        cartItems.querySelectorAll('.fa-trash').forEach(trash => {
            trash.addEventListener('click', (e) => {
                const productId = e.target.dataset.id;
                removeFromCart(productId);
            });
        });

        if (cartTotal) {
            cartTotal.textContent = `Total: $${total.toFixed(2)}`;
        }
    }

    // Utility functions
    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    function showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.classList.add('show');
        }, 100);

        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }

    // Initialize Swiper sliders
    try {
        const productSlider = new Swiper(".product-slider", {
            loop: true,
            spaceBetween: 20,
            autoplay: {
                delay: 7500,
                disableOnInteraction: false,
            },
            centeredSlides: true,
            breakpoints: {
                0: {
                    slidesPerView: 1,
                },
                768: {
                    slidesPerView: 2,
                },
                1020: {
                    slidesPerView: 3,
                },
            },
        });

        const reviewSlider = new Swiper(".review-slider", {
            loop: true,
            spaceBetween: 20,
            autoplay: {
                delay: 7500,
                disableOnInteraction: false,
            },
            centeredSlides: true,
            breakpoints: {
                0: {
                    slidesPerView: 1,
                },
                768: {
                    slidesPerView: 2,
                },
                1020: {
                    slidesPerView: 3,
                },
            },
        });
    } catch (error) {
        console.error('Error initializing sliders:', error);
    }
});