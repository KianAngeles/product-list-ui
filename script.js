let cart = [];

// Add to Cart
function addToCart(name, price, image = '') {
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name, price, quantity: 1, image });
    }
    updateCart();
}

// Updating Carr
function updateCart() {
    const cartItemsDiv = document.getElementById('cart-items');
    cartItemsDiv.innerHTML = '';

    if (cart.length === 0) {
        cartItemsDiv.classList.add('empty-cart');
        cartItemsDiv.innerHTML = `
            <img src="images/cart.png" alt="Cart Icon">
            <p>Your Cart is Empty</p>
        `;
    } else {
        cartItemsDiv.classList.remove('empty-cart');

        cart.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('cart-item');

            itemDiv.innerHTML = `
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>₱${item.price}</p>
                    <div class="cart-quantity">
                        <button onclick="changeQuantity('${item.name}', -1)">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="changeQuantity('${item.name}', 1)">+</button>
                    </div>
                </div>
            `;
            cartItemsDiv.appendChild(itemDiv);
        });
    }

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    document.getElementById('total-price').textContent = `₱${total}`;
}

function changeQuantity(name, change) {
    const item = cart.find(i => i.name === name);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            cart = cart.filter(i => i.name !== name);
        }
    }
    updateCart();
}

// Search bar functionality
document.getElementById('searchBar').addEventListener('input', function () {
    const searchTerm = this.value.toLowerCase();
    const products = document.querySelectorAll('.product-card');

    products.forEach(product => {
        const name = product.querySelector('h3').textContent.toLowerCase();
        const description = product.querySelector('p').textContent.toLowerCase();

        if (name.includes(searchTerm) || description.includes(searchTerm)) {
            product.style.display = 'flex';
        } else {
            product.style.display = 'none';
        }
    });
});

// Checkout button
document.getElementById('checkout-btn').addEventListener('click', function () {
    if (cart.length === 0) {
        alert("Your cart is empty! Add something first.");
        return;
    }

    let receiptHTML = "<ul style='text-align:left;'>";
    cart.forEach(item => {
        receiptHTML += `<li>${item.quantity} × ${item.name} - ₱${item.price * item.quantity}</li>`;
    });
    receiptHTML += "</ul>";

    document.getElementById('receipt-details').innerHTML = receiptHTML;

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    document.getElementById('receipt-total').textContent = `₱${total}`;

    document.getElementById('receipt-popup').style.display = 'flex';
});

// Handle Confirm
document.getElementById('confirm-order').addEventListener('click', function () {
    document.getElementById('receipt-popup').style.display = 'none';
    document.getElementById('checkout-popup').style.display = 'flex';

    confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 }
    });

    cart = [];
    updateCart();
});

// Handle Cancel
document.getElementById('cancel-order').addEventListener('click', function () {
    document.getElementById('receipt-popup').style.display = 'none';
});

// Close Popup
document.getElementById('close-popup').addEventListener('click', function () {
    document.getElementById('checkout-popup').style.display = 'none';
});

window.addEventListener('click', function (e) {
    if (e.target === document.getElementById('checkout-popup')) {
        document.getElementById('checkout-popup').style.display = 'none';
    }
});


