const productsData = [
    {
        id: "1",
        name: "Wireless Headphones",
        price: 12499,
        image: "https://images.pexels.com/photos/3394663/pexels-photo-3394663.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop",
        cartImage: "https://images.pexels.com/photos/3394663/pexels-photo-3394663.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
        description: "High-fidelity sound, 24-hour battery. Noise-cancelling technology lets you focus on what matters. Lightweight and comfortable for all-day wear."
    },
    {
        id: "2",
        name: "Smart Watch",
        price: 14999,
        image: "https://images.pexels.com/photos/440320/pexels-photo-440320.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop",
        cartImage: "https://images.pexels.com/photos/440320/pexels-photo-440320.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
        description: "Track your fitness, stay connected. All your notifications, right on your wrist. Water-resistant and stylish."
    },
    {
        id: "3",
        name: "Running Shoes",
        price: 4599,
        image: "https://images.pexels.com/photos/1027130/pexels-photo-1027130.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop",
        cartImage: "https://images.pexels.com/photos/1027130/pexels-photo-1027130.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
        description: "Lightweight and comfortable. These shoes are built for speed and endurance, helping you achieve your personal best."
    },
    {
        id: "4",
        name: "Coffee Maker",
        price: 2999,
        image: "https://images.pexels.com/photos/1436310/pexels-photo-1436310.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop",
        cartImage: "https://images.pexels.com/photos/1436310/pexels-photo-1436310.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
        description: "Brew the perfect cup every time. This machine offers multiple brew sizes and strengths for your ideal coffee."
    },
    {
        id: "5",
        name: "Laptop Backpack",
        price: 3499,
        image: "https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop",
        cartImage: "https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
        description: "Durable, waterproof, and spacious. Features a dedicated padded slot for your laptop and multiple compartments."
    },
    {
        id: "6",
        name: "Portable Speaker",
        price: 2299,
        image: "https://images.pexels.com/photos/191877/pexels-photo-191877.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop",
        cartImage: "https://images.pexels.com/photos/191877/pexels-photo-191877.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
        description: "Bluetooth 5.0, 12-hour playtime. Crystal clear sound in a compact, travel-ready size."
    }
];

document.addEventListener('DOMContentLoaded', () => {

    let cartItems = JSON.parse(localStorage.getItem('buyoraCart')) || [];

    function persistCart() {
        localStorage.setItem('buyoraCart', JSON.stringify(cartItems));
    }

    function updateCartBadge() {
        const cartBadge = document.getElementById('cart-badge');
        if (cartBadge) {
            const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
            cartBadge.innerText = totalItems;
        }
    }

    function showToast(message) {
        const toast = document.getElementById('toast-alert');
        if (!toast) return;

        toast.innerText = message;
        toast.classList.add('show');

        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    function addItemToCart(id, name, price, image, quantity = 1) {
        const existingItem = cartItems.find(item => item.id === id);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cartItems.push({ id, name, price, image, quantity });
        }

        persistCart();
        updateCartBadge();
        showToast(`Added "${name}" to cart!`);
    }

    function updateCartItemQuantity(id, quantity) {
        const item = cartItems.find(item => item.id === id);
        if (item) {
            if (quantity > 0) {
                item.quantity = quantity;
            } else {
                cartItems = cartItems.filter(item => item.id !== id);
            }
            persistCart();
            updateCartBadge();

            if (document.getElementById('cart-list')) {
                renderCartItems();
            }
        }
    }

    function removeItemFromCart(id) {
        cartItems = cartItems.filter(item => item.id !== id);
        persistCart();
        updateCartBadge();

        if (document.getElementById('cart-list')) {
            renderCartItems();
        }
        showToast("Item removed from cart.");
    }

    function renderCartItems() {
        const cartList = document.getElementById('cart-list');
        const emptyCartMsg = document.getElementById('empty-cart-msg');
        const subtotalEl = document.getElementById('cart-subtotal');
        const totalEl = document.getElementById('cart-total');

        if (!cartList) return;

        cartList.innerHTML = '';

        if (cartItems.length === 0) {
            cartList.appendChild(emptyCartMsg);
            emptyCartMsg.style.display = 'block';
        } else {
            emptyCartMsg.style.display = 'none';
            let subtotal = 0;

            cartItems.forEach(item => {
                subtotal += item.price * item.quantity;

                const itemElement = document.createElement('div');
                itemElement.classList.add('cart-item');
                itemElement.innerHTML = `
                    <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                    <div class="cart-item-info">
                        <h4>${item.name}</h4>
                        <p>₹${item.price.toLocaleString('en-IN')}</p>
                    </div>
                    <div class*="cart-item-actions">
                        <input type="number" class="form-input cart-item-quantity" value="${item.quantity}" min="1" data-id="${item.id}">
                        <button class="btn btn-outline remove-item-btn" data-id="${item.id}">Remove</button>
                    </div>
                `;
                cartList.appendChild(itemElement);
            });

            cartList.querySelectorAll('.cart-item-quantity').forEach(input => {
                input.addEventListener('change', (e) => {
                    const id = e.target.dataset.id;
                    const quantity = parseInt(e.target.value, 10);
                    updateCartItemQuantity(id, quantity);
                });
            });

            cartList.querySelectorAll('.remove-item-btn').forEach(button => {
                button.addEventListener('click', (e) => {
                    const id = e.target.dataset.id;
                    removeItemFromCart(id);
                });
            });

            const total = subtotal;
            
            subtotalEl.innerText = `₹${subtotal.toLocaleString('en-IN')}`;
            totalEl.innerText = `₹${total.toLocaleString('en-IN')}`;
        }
    }

    document.querySelectorAll('.add-cart-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const { id, name, price, image } = e.target.dataset;
            let quantity = 1;
            const quantityInput = document.getElementById('quantity');
            if (quantityInput) {
                quantity = parseInt(quantityInput.value, 10);
            }
            addItemToCart(id, name, parseFloat(price), image, quantity);
        });
    });

    updateCartBadge();

    if (window.location.pathname.endsWith('cart.html') || window.location.pathname.endsWith('cart')) {
        renderCartItems();
    }

    const sliderTrack = document.getElementById('hero-slider-track');
    if (sliderTrack) {
        const slides = document.querySelectorAll('.slide');
        const slideCount = slides.length - 1;
        const slideWidthPercentage = 100 / slides.length;
        let currentSlide = 0;

        setInterval(() => {
            currentSlide++;

            sliderTrack.style.transition = 'transform 0.5s ease-in-out';
            sliderTrack.style.transform = `translateX(-${slideWidthPercentage * currentSlide}%)`;


            if (currentSlide === slideCount) {

                setTimeout(() => {
                    sliderTrack.style.transition = 'none';
                    sliderTrack.style.transform = 'translateX(0)';
                    currentSlide = 0;
                }, 500);
            }

        }, 2000);
    }

    if (document.body.id === 'page-product-detail') {
        const params = new URLSearchParams(window.location.search);
        const productId = params.get('id');
        const product = productsData.find(p => p.id === productId);

        if (product) {
            document.getElementById('detail-title').innerText = product.name;
            document.getElementById('detail-price').innerText = `₹${product.price.toLocaleString('en-IN')}`;
            document.getElementById('detail-desc').innerText = product.description;

            const img = document.getElementById('detail-image');
            img.src = product.image;
            img.alt = product.name;

            const btn = document.getElementById('detail-add-btn');
            btn.dataset.id = product.id;
            btn.dataset.name = product.name;
            btn.dataset.price = product.price;
            btn.dataset.image = product.cartImage;
        } else {
            document.querySelector('.detail-layout').innerHTML = '<h2 class="section-title">Product not found.</h2>';
        }
    }
});

