document.addEventListener('DOMContentLoaded', () => {
    // Select DOM elements
    const searchForm = document.querySelector('.search-form');
    const shoppingCart = document.querySelector('.shopping-cart');
    const loginForm = document.querySelector('.login-form');
    const navbar = document.querySelector('.navbar');

    // Search button functionality
    const searchBtn = document.querySelector('#search-btn');
    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            toggleActiveSection(searchForm);
        });
    }

    // Cart button functionality
    const cartBtn = document.querySelector('#cart-btn');
    if (cartBtn) {
        cartBtn.addEventListener('click', () => {
            toggleActiveSection(shoppingCart);
        });
    }

    // Login button functionality
    const loginBtn = document.querySelector('#login-btn');
    if (loginBtn) {
        loginBtn.addEventListener('click', () => {
            toggleActiveSection(loginForm);
        });
    }

    // Menu button functionality
    const menuBtn = document.querySelector('#menu-btn');
    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            toggleActiveSection(navbar);
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

    // Product Slider Configuration
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
    } catch (error) {
        console.error('Error initializing product slider:', error);
    }

    // Review Slider Configuration
    try {
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
        console.error('Error initializing review slider:', error);
    }
});